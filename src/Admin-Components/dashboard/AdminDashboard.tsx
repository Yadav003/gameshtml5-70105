import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, TrendingUp, UserCheck, Users } from "lucide-react";
import AdminLayout from "@/Admin-Components/layout/AdminLayout";
import { adminApi, type AdminDashboardStats } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const defaultStats: AdminDashboardStats = {
  totalUsers: 0,
  activeToday: 0,
  verifiedProfiles: 0,
  growthThisWeek: 0,
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminDashboardStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.getDashboard();
        if (isActive) {
          setStats(response);
        }
      } catch (error) {
        if (isActive) {
          toast({
            title: "Failed to load dashboard",
            description: error instanceof Error ? error.message : "Try again in a moment.",
            variant: "destructive",
          });
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      isActive = false;
    };
  }, [toast]);

  const formatValue = (value: number) => (isLoading ? "--" : value.toLocaleString());
  const formatGrowth = (value: number) => (isLoading ? "--" : `${value.toFixed(1)}%`);

  return (
    <AdminLayout title="Dashboard" subtitle="Quick overview of users and activity.">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="mt-1 text-3xl font-bold">{formatValue(stats.totalUsers)}</p>
            </div>
            <Users className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Active Today</p>
              <p className="mt-1 text-3xl font-bold">{formatValue(stats.activeToday)}</p>
            </div>
            <Activity className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Verified Profiles</p>
              <p className="mt-1 text-3xl font-bold">{formatValue(stats.verifiedProfiles)}</p>
            </div>
            <UserCheck className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Growth This Week</p>
              <p className="mt-1 text-3xl font-bold">{formatGrowth(stats.growthThisWeek)}</p>
            </div>
            <TrendingUp className="h-7 w-7 text-primary" />
          </CardContent>
        </Card>
      </section>

    </AdminLayout>
  );
};

export default AdminDashboard;