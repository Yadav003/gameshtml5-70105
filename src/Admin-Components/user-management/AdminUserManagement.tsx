import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, Pencil, Search, Trash2 } from "lucide-react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";

type UserStatus = "Active" | "Pending" | "Suspended";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: UserStatus;
  joined: string;
};

const initialUsers: AdminUser[] = [
  {
    id: "u-101",
    name: "Ariana Miles",
    email: "ariana.miles@playverse.com",
    phone: "+1 202 555 0114",
    role: "Moderator",
    status: "Active",
    joined: "2026-01-18",
  },
  {
    id: "u-102",
    name: "Jordan Lee",
    email: "jordan.lee@playverse.com",
    phone: "+1 202 555 0135",
    role: "Member",
    status: "Pending",
    joined: "2026-03-02",
  },
  {
    id: "u-103",
    name: "Priya Nair",
    email: "priya.nair@playverse.com",
    phone: "+1 202 555 0170",
    role: "Creator",
    status: "Active",
    joined: "2025-11-21",
  },
  {
    id: "u-104",
    name: "Marcus Chen",
    email: "marcus.chen@playverse.com",
    phone: "+1 202 555 0109",
    role: "Member",
    status: "Suspended",
    joined: "2025-08-16",
  },
  {
    id: "u-105",
    name: "Elena Rossi",
    email: "elena.rossi@playverse.com",
    phone: "+1 202 555 0197",
    role: "VIP",
    status: "Active",
    joined: "2024-12-05",
  },
];

const AdminUserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>(initialUsers[0]?.id ?? "");
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "Active" as UserStatus,
  });

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.phone} ${user.role} ${user.status}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [users, search]
  );

  useEffect(() => {
    if (filteredUsers.length === 0) {
      setSelectedUserId("");
      return;
    }

    const userStillVisible = filteredUsers.some((user) => user.id === selectedUserId);
    if (!userStillVisible) {
      setSelectedUserId(filteredUsers[0].id);
    }
  }, [filteredUsers, selectedUserId]);

  const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? null;

  const openEdit = (user: AdminUser) => {
    setEditUserId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
  };

  const saveEdit = () => {
    if (!editUserId) return;

    setUsers((current) =>
      current.map((user) =>
        user.id === editUserId
          ? {
              ...user,
              name: editForm.name,
              email: editForm.email,
              phone: editForm.phone,
              role: editForm.role,
              status: editForm.status,
            }
          : user
      )
    );
    setEditUserId(null);
  };

  const deleteUser = (id: string) => {
    const nextUsers = users.filter((user) => user.id !== id);
    setUsers(nextUsers);

    if (selectedUserId === id) {
      setSelectedUserId(nextUsers[0]?.id ?? "");
    }

    if (editUserId === id) {
      setEditUserId(null);
    }
  };

  const downloadExcel = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Role", "Status", "Joined"];
    const rows = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.role,
      user.status,
      user.joined,
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

  const activeUsers = users.filter((user) => user.status === "Active").length;

  return (
    <AdminLayout
      title="User Management"
      subtitle="View users, update details, delete users, see profile, and download data in Excel format."
    >
      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, phone or role"
            className="pl-10"
          />
        </div>
        <Button onClick={downloadExcel} className="gap-2">
          <Download className="h-4 w-4" />
          Download Excel
        </Button>
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
            <p className="mt-1 text-2xl font-bold">{filteredUsers.length}</p>
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
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.status}</Badge>
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
                    <p className="font-semibold">{selectedUser.phone}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-muted-foreground">Role</p>
                      <p className="font-semibold">{selectedUser.role}</p>
                    </div>
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-semibold">{selectedUser.joined}</p>
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
                  <Input
                    placeholder="Phone"
                    value={editForm.phone}
                    onChange={(event) => setEditForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                  <Input
                    placeholder="Role"
                    value={editForm.role}
                    onChange={(event) => setEditForm((current) => ({ ...current, role: event.target.value }))}
                  />
                  <Input
                    placeholder="Status"
                    value={editForm.status}
                    onChange={(event) =>
                      setEditForm((current) => ({ ...current, status: event.target.value as UserStatus }))
                    }
                  />
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={saveEdit}>
                      Save
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
    </AdminLayout>
  );
};

export default AdminUserManagement;
