import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, UserCheck, Users } from "lucide-react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard" subtitle="Quick overview of users and activity.">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="mt-1 text-3xl font-bold">1,248</p>
            </div>
            <Users className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Active Today</p>
              <p className="mt-1 text-3xl font-bold">386</p>
            </div>
            <Activity className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Verified Profiles</p>
              <p className="mt-1 text-3xl font-bold">1,102</p>
            </div>
            <UserCheck className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Growth This Week</p>
              <p className="mt-1 text-3xl font-bold">+8.4%</p>
            </div>
            <TrendingUp className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
      </section>

    </AdminLayout>
  );
};

export default AdminDashboard;