import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Pencil, Search, Trash2 } from "lucide-react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { adminApi, type AdminUser } from "@/lib/api";

const AdminUserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loginProviderFilter, setLoginProviderFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "active",
    password: "",
    lockUntil: "",
  });
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    users.forEach((user) => {
      if (user.role) roles.add(user.role);
    });
    return ["all", ...Array.from(roles).sort((a, b) => a.localeCompare(b))];
  }, [users]);

  const totalPages = Math.max(1, Math.ceil(totalUsers / Math.max(limit, 1)));

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);

    return () => window.clearTimeout(handle);
  }, [searchInput]);

  useEffect(() => {
    let isActive = true;

    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.getUsers({
          page,
          limit,
          search: search || undefined,
          role: roleFilter !== "all" ? roleFilter : undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          loginProvider: loginProviderFilter !== "all" ? loginProviderFilter : undefined,
        });

        if (!isActive) return;

        setUsers(response.users);
        setTotalUsers(response.total);

        if (response.page !== page) setPage(response.page);
        if (response.limit !== limit) setLimit(response.limit);

        const stillVisible = response.users.some((user) => user.id === selectedUserId);
        if (!stillVisible) {
          setSelectedUserId(response.users[0]?.id ?? "");
          setSelectedUser(response.users[0] ?? null);
        }
      } catch (error) {
        if (isActive) {
          toast({
            title: "Failed to load users",
            description: error instanceof Error ? error.message : "Please retry in a moment.",
            variant: "destructive",
          });
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadUsers();

    return () => {
      isActive = false;
    };
  }, [page, limit, search, roleFilter, statusFilter, loginProviderFilter, selectedUserId, toast]);

  useEffect(() => {
    if (!selectedUserId) {
      setSelectedUser(null);
      return;
    }

    let isActive = true;

    const loadUser = async () => {
      try {
        const user = await adminApi.getUser(selectedUserId);
        if (isActive && user) {
          setSelectedUser(user);
        }
      } catch (error) {
        if (isActive) {
          toast({
            title: "Failed to load user",
            description: error instanceof Error ? error.message : "Please retry in a moment.",
            variant: "destructive",
          });
        }
      }
    };

    void loadUser();

    return () => {
      isActive = false;
    };
  }, [selectedUserId, toast]);

  const toLocalDateTime = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
  };

  const resolveStatus = (user: AdminUser) => {
    const status = user.status?.toLowerCase();
    if (status) return status.charAt(0).toUpperCase() + status.slice(1);
    if (user.lockUntil) return "Suspended";
    return "Active";
  };

  const openEdit = (user: AdminUser) => {
    setEditUserId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role ?? "user",
      status: user.status ?? "active",
      password: "",
      lockUntil: toLocalDateTime(user.lockUntil),
    });
  };

  const saveEdit = async () => {
    if (!editUserId || isSaving) return;
    const trimmedName = editForm.name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 30) {
      toast({
        title: "Invalid name",
        description: "Name must be between 3 and 30 characters.",
        variant: "destructive",
      });
      return;
    }
    if (editForm.password && editForm.password.length < 8) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setIsSaving(true);

    try {
      const updatedUser = await adminApi.updateUser(editUserId, {
        name: trimmedName,
        email: editForm.email,
        role: editForm.role || undefined,
        status: editForm.status || undefined,
        password: editForm.password || undefined,
        lockUntil: editForm.lockUntil ? new Date(editForm.lockUntil).toISOString() : null,
      });

      if (updatedUser) {
        setUsers((current) => current.map((user) => (user.id === editUserId ? { ...user, ...updatedUser } : user)));
        if (selectedUserId === editUserId) {
          setSelectedUser(updatedUser);
        }
      }

      setEditUserId(null);
      setEditForm({ name: "", email: "", role: "", status: "active", password: "", lockUntil: "" });
      toast({ title: "User updated" });
    } catch (error) {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      await adminApi.deleteUser(id);
      setUsers((current) => current.filter((user) => user.id !== id));
      setTotalUsers((current) => Math.max(current - 1, 0));

      if (selectedUserId === id) {
        const nextUser = users.find((user) => user.id !== id) ?? null;
        setSelectedUserId(nextUser?.id ?? "");
        setSelectedUser(nextUser);
      }

      if (editUserId === id) {
        setEditUserId(null);
      }

      toast({ title: "User deleted" });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const createUser = async () => {
    if (isCreating) return;
    const trimmedName = createForm.name.trim();
    if (!trimmedName || !createForm.email || !createForm.password) {
      toast({
        title: "Missing details",
        description: "Name, email, and password are required.",
        variant: "destructive",
      });
      return;
    }
    if (trimmedName.length < 3 || trimmedName.length > 30) {
      toast({
        title: "Invalid name",
        description: "Name must be between 3 and 30 characters.",
        variant: "destructive",
      });
      return;
    }
    if (createForm.password.length < 8) {
      toast({
        title: "Invalid password",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    if (!createForm.role) {
      toast({
        title: "Role required",
        description: "Please select a role for the new user.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const newUser = await adminApi.createUser({
        name: trimmedName,
        email: createForm.email,
        password: createForm.password,
        role: createForm.role,
        status: createForm.status || undefined,
      });

      if (newUser) {
        setUsers((current) => [newUser, ...current]);
        setTotalUsers((current) => current + 1);
        setSelectedUserId(newUser.id);
        setSelectedUser(newUser);
      }

      setCreateForm({ name: "", email: "", password: "", role: "user", status: "active" });
      toast({ title: "User created" });
    } catch (error) {
      toast({
        title: "Create failed",
        description: error instanceof Error ? error.message : "Please retry in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const downloadExcel = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Role", "Status", "Joined"];
    const rows = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.phone ?? "",
      user.role ?? "",
      resolveStatus(user),
      user.joined ?? "",
    ]);

    const content = [headers, ...rows]
      .map((row) => row.map((cell) => String(cell).replace(/\t/g, " ")).join("\t"))
      .join("\n");

    const blob = new Blob([content], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users-data.xls";
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeUsers = users.filter((user) => resolveStatus(user) === "Active").length;

  return (
    <AdminLayout
      title="User Management"
      subtitle="View users, update details, delete users, see profile, and download data in Excel format."
    >
      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search by name, email, phone or role"
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={roleFilter}
            onValueChange={(value) => {
              setRoleFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
                <SelectItem key={role} value={role}>
                  {role === "all" ? "All roles" : role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[110px]">
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
          <Button onClick={downloadExcel} className="gap-2" variant="outline">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </section>

      <section className="mt-3 flex flex-wrap items-center gap-2">
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={loginProviderFilter}
          onValueChange={(value) => {
            setLoginProviderFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Login provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            <SelectItem value="local">Local</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="mt-1 text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="mt-1 text-2xl font-bold">{activeUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Filtered Results</p>
            <p className="mt-1 text-2xl font-bold">{users.length}</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role ?? "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{resolveStatus(user)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedUserId(user.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openEdit(user)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Name"
                value={createForm.name}
                onChange={(event) => setCreateForm((current) => ({ ...current, name: event.target.value }))}
              />
              <Input
                placeholder="Email"
                type="email"
                value={createForm.email}
                onChange={(event) => setCreateForm((current) => ({ ...current, email: event.target.value }))}
              />
              <Input
                placeholder="Password"
                type="password"
                value={createForm.password}
                onChange={(event) => setCreateForm((current) => ({ ...current, password: event.target.value }))}
              />
              <Select
                value={createForm.role}
                onValueChange={(value) => setCreateForm((current) => ({ ...current, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={createForm.status}
                onValueChange={(value) => setCreateForm((current) => ({ ...current, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={createUser} disabled={isCreating} className="w-full">
                {isCreating ? "Creating..." : "Create User"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {selectedUser ? (
                <>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-semibold">{selectedUser.name}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-semibold">{selectedUser.email}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold">{selectedUser.phone ?? "-"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-muted-foreground">Role</p>
                      <p className="font-semibold">{selectedUser.role ?? "-"}</p>
                    </div>
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-semibold">{selectedUser.joined ?? "-"}</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">Select a user to see profile details.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Update User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {editUserId ? (
                <>
                  <Input
                    placeholder="Name"
                    value={editForm.name}
                    onChange={(event) => setEditForm((current) => ({ ...current, name: event.target.value }))}
                  />
                  <Input
                    placeholder="Email"
                    value={editForm.email}
                    onChange={(event) => setEditForm((current) => ({ ...current, email: event.target.value }))}
                  />
                  <Select
                    value={editForm.role}
                    onValueChange={(value) => setEditForm((current) => ({ ...current, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={editForm.status}
                    onValueChange={(value) => setEditForm((current) => ({ ...current, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Password (optional)"
                    type="password"
                    value={editForm.password}
                    onChange={(event) => setEditForm((current) => ({ ...current, password: event.target.value }))}
                  />
                  <Input
                    placeholder="Lock until (optional)"
                    type="datetime-local"
                    value={editForm.lockUntil}
                    onChange={(event) => setEditForm((current) => ({ ...current, lockUntil: event.target.value }))}
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={saveEdit} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setEditUserId(null)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Click the edit icon in a row to update user details.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages} ({totalUsers} users)
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page <= 1}>
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminUserManagement;
