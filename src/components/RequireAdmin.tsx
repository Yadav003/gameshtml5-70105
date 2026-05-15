import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";

type RequireAdminProps = {
  children: ReactNode;
};

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { user, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const role = user.role?.toLowerCase();
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
