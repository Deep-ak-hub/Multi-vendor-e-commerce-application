import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { type ApiError } from "../../lib/axios.config";
import ButtonComponent from "../../components/ui/ButtonComponent";

// 3 possible states — loading, expired token, or any other error
type PageState = "loading" | "expired" | "error";

export default function VerifyAccountPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<PageState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRun = useRef(false); // prevent React 18 StrictMode double-fire

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Edge case: someone lands on /verify without a token in URL
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("error");
      setErrorMessage("No activation token found in the URL.");
      return;
    }

    axiosInstance
      .get(`/auth/activate/${token}`)
      // eslint-disable-next-line
      .then((response: any) => {
        // Covers both: fresh activation (201) and already active (200)
        // Both are success paths from backend, both should redirect to login
        toast.success(response.message || "Account activated! Please login.");
        navigate("/");
      })
      .catch((error: ApiError) => {
        if (error.errorCode === "ACTIVATION_TOKEN_EXPIRED") {
          // Special UI for expired token — give user a clear next step
          setState("expired");
        } else {
          // USER_NOT_FOUND_ERR, network error, or anything unexpected
          setState("error");
          setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
      });
  }, [token, navigate]);

  // ── Loading ──────────────────────────────────────────────
  if (state === "loading") {
    return (
      <PageCard>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mb-4 mx-auto" />
        <h1 className="text-xl font-bold text-slate-900">Verifying your account...</h1>
        <p className="text-slate-500 mt-2">Please wait a moment.</p>
      </PageCard>
    );
  }

  // ── Token Expired ─────────────────────────────────────────
  if (state === "expired") {
    return (
      <PageCard>
        <div className="text-5xl mb-4">⏰</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Activation Link Expired</h1>
        <p className="text-slate-600 mb-6">
          Your 24-hour activation link has expired. Please register again to receive a new one.
        </p>
        <ButtonComponent
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-button-primary hover:bg-button-primary-hover text-white rounded-xl font-semibold transition cursor-pointer"
        >
          Register Again
        </ButtonComponent>
      </PageCard>
    );
  }

  // ── Generic Error (invalid token, user not found, network, etc.) ──
  return (
    <PageCard>
      <div className="text-5xl mb-4">⚠️</div>
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Activation Failed</h1>
      <p className="text-red-600 bg-red-50 p-4 rounded-xl mb-6">{errorMessage}</p>
      <ButtonComponent
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-button-primary hover:bg-button-primary-hover text-white rounded-xl font-semibold transition cursor-pointer"
      >
        Go to Login
      </ButtonComponent>
    </PageCard>
  );
}

// Reusable layout wrapper — avoids repeating the same shell 3 times
function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_16px_40px_rgba(16,24,40,0.08)] p-8 text-center">
        {children}
      </div>
    </div>
  );
}