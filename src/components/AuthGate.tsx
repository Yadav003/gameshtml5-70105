import { type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

const AuthGate = ({ children }: { children: ReactNode }) => {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="text-sm">Loading your session...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
