import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { rewardApi, type AdminRewardRedemption, type RedemptionStatus } from "@/lib/api";

const adminStatuses = ["APPROVED", "REJECTED", "FULFILLED"] as const;

const formatDate = (value: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
};

const AdminRewardRedemptions = () => {
  const { toast } = useToast();
  const [redemptions, setRedemptions] = useState<AdminRewardRedemption[]>([]);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [brandFilter, setBrandFilter] = useState("all");
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [drafts, setDrafts] = useState<Record<string, { status: Exclude<RedemptionStatus, "PENDING">; remark: string }>>(
    {},
  );

  const totalPages = Math.max(1, Math.ceil(total / Math.max(limit, 1)));

  const loadRedemptions = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await rewardApi.getAdminRedemptions({
        status: statusFilter,
        brand: brandFilter,
        from: fromFilter || undefined,
        to: toFilter || undefined,
        page,
        limit,
      });
      setRedemptions(response.redemptions);
      setTotal(response.total);
      setPage(response.page);
      setLimit(response.limit);
    } catch (error) {
      toast({
        title: "Failed to load redemptions",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [brandFilter, fromFilter, limit, page, statusFilter, toFilter, toast]);

  useEffect(() => {
    void loadRedemptions();
  }, [loadRedemptions]);

  const updateDraft = (id: string, patch: Partial<{ status: Exclude<RedemptionStatus, "PENDING">; remark: string }>) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        status: current[id]?.status ?? "APPROVED",
        remark: current[id]?.remark ?? "",
        ...patch,
      },
    }));
  };

  const updateStatus = async (redemption: AdminRewardRedemption) => {
    if (updatingId) return;
    const draft = drafts[redemption.id] ?? { status: "APPROVED" as const, remark: "" };
    setUpdatingId(redemption.id);

    try {
      await rewardApi.updateAdminRedemption(redemption.id, {
        status: draft.status,
        remark: draft.remark.trim(),
      });
      toast({ title: "Redemption updated" });
      await loadRedemptions();
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setUpdatingId("");
    }
  };

  const activeFilters = useMemo(
    () => [statusFilter !== "all", brandFilter !== "all", fromFilter, toFilter].filter(Boolean).length,
    [brandFilter, fromFilter, statusFilter, toFilter],
  );

  return (
    <AdminLayout
      title="Reward Redemptions"
      subtitle="Review, approve, reject, and fulfill reward redemption requests."
    >
      <section className="rounded-lg border border-border bg-background p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="FULFILLED">Fulfilled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={brandFilter}
            onValueChange={(value) => {
              setBrandFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All brands</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="flipkart">Flipkart</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={fromFilter}
            onChange={(event) => {
              setFromFilter(event.target.value);
              setPage(1);
            }}
          />
          <Input
            type="date"
            value={toFilter}
            onChange={(event) => {
              setToFilter(event.target.value);
              setPage(1);
            }}
          />
          <Button type="button" onClick={() => void loadRedemptions()} disabled={isLoading}>
            {isLoading ? "Loading..." : `Apply${activeFilters ? ` (${activeFilters})` : ""}`}
          </Button>
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-border bg-background p-4 shadow-sm">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading reward redemptions...</div>
          ) : redemptions.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No redemptions match these filters.</div>
          ) : (
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="border-b border-border text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4 font-semibold">User Email</th>
                  <th className="py-3 pr-4 font-semibold">Brand</th>
                  <th className="py-3 pr-4 font-semibold">Coupon</th>
                  <th className="py-3 pr-4 font-semibold">Points</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 pr-4 font-semibold">Created</th>
                  <th className="py-3 pr-4 font-semibold">Processed</th>
                  <th className="py-3 pr-4 font-semibold">Remark</th>
                  <th className="py-3 pr-4 font-semibold">Update</th>
                </tr>
              </thead>
              <tbody>
                {redemptions.map((redemption) => {
                  const draft = drafts[redemption.id] ?? { status: "APPROVED" as const, remark: "" };

                  return (
                    <tr key={redemption.id} className="border-b border-border/70 align-top last:border-0">
                      <td className="py-3 pr-4">{redemption.userEmail || "-"}</td>
                      <td className="py-3 pr-4 font-semibold capitalize">{redemption.brand}</td>
                      <td className="py-3 pr-4">₹{redemption.couponAmount}</td>
                      <td className="py-3 pr-4">{redemption.pointsUsed}</td>
                      <td className="py-3 pr-4">
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {redemption.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">{formatDate(redemption.createdAt)}</td>
                      <td className="py-3 pr-4">{formatDate(redemption.processedAt)}</td>
                      <td className="py-3 pr-4">{redemption.adminRemark || "-"}</td>
                      <td className="w-[320px] py-3 pr-4">
                        <div className="grid gap-2">
                          <Select
                            value={draft.status}
                            onValueChange={(value) =>
                              updateDraft(redemption.id, {
                                status: value as Exclude<RedemptionStatus, "PENDING">,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {adminStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={draft.remark}
                            onChange={(event) => updateDraft(redemption.id, { remark: event.target.value })}
                            placeholder="Admin remark"
                          />
                          <Button
                            type="button"
                            onClick={() => void updateStatus(redemption)}
                            disabled={Boolean(updatingId)}
                          >
                            {updatingId === redemption.id ? "Updating..." : "Save Status"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm">
          <p className="text-muted-foreground">
            Page {page} of {totalPages} · {total} requests
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= totalPages || isLoading}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminRewardRedemptions;
