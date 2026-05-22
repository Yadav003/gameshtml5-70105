import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Mail, MessageSquare, Phone, RefreshCw, Search, Trash2 } from "lucide-react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type AdminContactReport } from "@/lib/api";

const normalizeStatus = (status?: string | null) => {
  const value = (status ?? "new").toLowerCase();
  if (["new", "open", "pending", "unread"].includes(value)) return "new";
  if (["in-progress", "in_progress", "progress", "working"].includes(value)) return "in-progress";
  if (["resolved", "closed", "done", "completed"].includes(value)) return "resolved";
  return value;
};

const formatStatusLabel = (status?: string | null) => {
  const normalized = normalizeStatus(status);
  if (normalized === "new") return "New";
  if (normalized === "in-progress") return "In Progress";
  if (normalized === "resolved") return "Resolved";
  return normalized
    .split(/[_-]/)
    .map((segment) => (segment ? segment[0].toUpperCase() + segment.slice(1) : segment))
    .join(" ");
};

const resolveStatusVariant = (status?: string | null) => {
  const normalized = normalizeStatus(status);
  if (normalized === "resolved") return "secondary";
  if (normalized === "in-progress") return "outline";
  if (normalized === "urgent") return "destructive";
  return "default";
};

const formatDateTime = (value?: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
};

const buildPreview = (message: string) => {
  if (message.length <= 80) return message;
  return `${message.slice(0, 80)}...`;
};

const AdminReports = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<AdminContactReport[]>([]);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteInProgressId, setDeleteInProgressId] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    let isActive = true;

    const loadReports = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.getContactReports({
          search: search || undefined,
          page,
          limit,
        });

        if (!isActive) return;
        setReports(response.reports);
        setTotal(response.total);
      } catch (error) {
        if (isActive) {
          toast({
            title: "Failed to load reports",
            description: error instanceof Error ? error.message : "Please retry in a moment.",
            variant: "destructive",
          });
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadReports();

    return () => {
      isActive = false;
    };
  }, [search, page, limit, refreshToken, toast]);

  const filteredReports = useMemo(() => {
    const query = search.toLowerCase();
    return reports.filter((report) => {
      const normalizedStatus = normalizeStatus(report.status);
      if (statusFilter !== "all" && normalizedStatus !== statusFilter) return false;
      if (!query) return true;

      const haystack = [report.name, report.email, report.subject, report.message, report.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [reports, search, statusFilter]);

  useEffect(() => {
    if (!filteredReports.some((report) => report.id === selectedId)) {
      setSelectedId(filteredReports[0]?.id ?? "");
    }
  }, [filteredReports, selectedId]);

  const selectedReport = filteredReports.find((report) => report.id === selectedId) ?? null;

  const statusCounts = useMemo(() => {
    const counts = { total: reports.length, new: 0, inProgress: 0, resolved: 0 };
    reports.forEach((report) => {
      const normalized = normalizeStatus(report.status);
      if (normalized === "resolved") counts.resolved += 1;
      else if (normalized === "in-progress") counts.inProgress += 1;
      else counts.new += 1;
    });
    return counts;
  }, [reports]);

  const totalPages = Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  const handleDelete = async (report: AdminContactReport) => {
    if (!report.id) return;

    const confirmed = window.confirm(
      `Delete the message from ${report.name || "Unknown"}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeleteInProgressId(report.id);
    try {
      await adminApi.deleteContactReport(report.id);
      setReports((current) => current.filter((item) => item.id !== report.id));
      setTotal((current) => Math.max(0, current - 1));
      setSelectedId((current) => (current === report.id ? "" : current));
      toast({
        title: "Message deleted",
        description: "The contact report was removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to delete",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgressId("");
    }
  };

  return (
    <AdminLayout title="Reports & Feedback" subtitle="Review messages sent through the contact form.">
      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by name, email, subject, or message"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setRefreshToken((current) => current + 1)}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Messages</p>
            <p className="mt-1 text-2xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">New</p>
            <p className="mt-1 text-2xl font-bold">{statusCounts.new}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Resolved</p>
            <p className="mt-1 text-2xl font-bold">{statusCounts.resolved}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      Loading messages...
                    </TableCell>
                  </TableRow>
                ) : filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      No messages found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{report.subject || "(No subject)"}</p>
                        <p className="text-xs text-muted-foreground">{buildPreview(report.message)}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={resolveStatusVariant(report.status)}>
                          {formatStatusLabel(report.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDateTime(report.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedId(report.id)}>
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void handleDelete(report)}
                            disabled={deleteInProgressId === report.id}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1 || isLoading}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages || isLoading}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedReport ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="text-base font-semibold">{selectedReport.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.email}</p>
                  </div>
                  <Badge variant={resolveStatusVariant(selectedReport.status)}>
                    {formatStatusLabel(selectedReport.status)}
                  </Badge>
                </div>

                <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDateTime(selectedReport.createdAt)}
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedReport.subject || "(No subject)"}</p>
                  </div>
                  {selectedReport.phone ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedReport.phone}</span>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </div>
                  <p className="whitespace-pre-line text-sm">{selectedReport.message || "No message provided."}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`mailto:${selectedReport.email}?subject=${encodeURIComponent(
                        selectedReport.subject ? `Re: ${selectedReport.subject}` : "Re: Contact message",
                      )}`}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Reply
                    </a>
                  </Button>
                  {selectedReport.phone ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${selectedReport.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </a>
                    </Button>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a message to view details.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminReports;
