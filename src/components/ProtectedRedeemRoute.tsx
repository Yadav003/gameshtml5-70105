import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { REDEEM_ACCESS_SESSION_KEY, type RedeemRouteState } from "@/types/reward.types";

interface ProtectedRedeemRouteProps {
  children: ReactNode;
}

const ProtectedRedeemRoute = ({ children }: ProtectedRedeemRouteProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [canAccess, setCanAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const routeState = location.state as RedeemRouteState | null;
    const hasRouterState = Boolean(routeState?.fromPlayAndEarn);
    const hasSessionFlag = sessionStorage.getItem(REDEEM_ACCESS_SESSION_KEY) === "true";

    if (hasRouterState || hasSessionFlag) {
      sessionStorage.removeItem(REDEEM_ACCESS_SESSION_KEY);
      setCanAccess(true);
      return;
    }

    toast({
      title: "Redeem Rewards",
      description: "Please access the Redeem Rewards page through the Play & Earn section.",
      variant: "destructive",
    });
    setCanAccess(false);
  }, [location.state, toast]);

  if (canAccess === null) {
    return null;
  }

  if (!canAccess) {
    return <Navigate to="/spin-wheel" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRedeemRoute;
