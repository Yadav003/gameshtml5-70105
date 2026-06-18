type LoginRequiredModalProps = {
  open: boolean;
  onLogin: () => void;
  title?: string;
  message?: string;
};

const LoginRequiredModal = ({
  open,
  onLogin,
  title = "🔒 Login Required",
  message = "Please login to access your profile and rewards.",
}: LoginRequiredModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-required-title"
      aria-describedby="login-required-message"
    >
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-2xl">
        <h2 id="login-required-title" className="mt-5 text-2xl font-extrabold text-card-foreground">
          {title}
        </h2>
        <p id="login-required-message" className="mt-3 text-sm leading-6 text-muted-foreground">
          {message}
        </p>
        <button
          type="button"
          onClick={onLogin}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
