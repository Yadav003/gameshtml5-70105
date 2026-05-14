import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string | undefined;
const root = createRoot(document.getElementById("root")!);

if (googleClientId) {
	root.render(
		<GoogleOAuthProvider clientId={googleClientId}>
			<App />
		</GoogleOAuthProvider>
	);
} else {
	console.warn("Missing VITE_GOOGLE_OAUTH_CLIENT_ID; Google login is disabled.");
	root.render(<App />);
}
