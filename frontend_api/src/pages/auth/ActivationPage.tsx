import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance, { type ApiError } from "../../lib/axios.config";

type Status = "idle" | "loading" | "success" | "error" | "expired";

export default function ActivationPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>(() => {
    if (!token) return "error";
    return "idle";
  });
  const [errorMsg, setErrorMsg] = useState(() => {
    if (!token) return "Invalid activation link – missing token.";
    return "";
  });
  const [tokenToResend, setTokenToResend] = useState<string | null>(null);
  const called = useRef(false);

  // Effect runs only when token exists and status is idle
  useEffect(() => {
    if (!token || status !== "idle") return;
    if (called.current) return;
    called.current = true;

    setStatus("loading");

    const activate = async () => {
      try {
        await axiosInstance.get(`/auth/activate/${token}`);
        setStatus("success");
        toast.success(
          <div>
            <strong>Account Activated</strong>
            <div>You can now log in.</div>
          </div>,
        );
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        const error = err as ApiError;
        if (error.errorCode === "ACTIVATION_TOKEN_EXPIRED") {
          setStatus("expired");
          setTokenToResend(token);
          setErrorMsg("Your activation token has expired.");
        } else if (error.errorCode === "ALREADY_ACTIVATED") {
          setStatus("success");
          toast.info(
            <div>
              <strong>Account already active</strong>
              <div>You can now log in.</div>
            </div>,
          );
          setTimeout(() => navigate("/"), 2000);
        } else {
          setStatus("error");
          setErrorMsg(error.message || "Activation failed. Please try again.");
          toast.error(
            <div>
              <strong>Activation Failed</strong>
              <div>{error.message}</div>
            </div>,
          );
        }
      }
    };

    activate();
  }, [token, status, navigate]);

  // Resend activation link
  const handleResend = async () => {
    if (!tokenToResend) return;
    try {
      await axiosInstance.get(`/auth/resend-activation-token/${tokenToResend}`);
      toast.success(
        <div>
          <strong>New activation link sent</strong>
          <div>Please check your email.</div>
        </div>,
      );
      // Reset to idle state – original UI reappears
      setStatus("idle");
      setErrorMsg("");
      setTokenToResend(null);
    } catch (err) {
      const error = err as ApiError;
      toast.error(
        <div>
          <strong>Failed to resend</strong>
          <div>{error.message || "Please try again later."}</div>
        </div>,
      );
    }
  };

  // UI Rendering (unchanged from previous version)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_16px_40px_rgba(16,24,40,0.08)] p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          {status === "success"
            ? "Account Activated!"
            : "Account Created Successfully"}
        </h1>

        {status === "loading" && (
          <div className="mb-4 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}

        {status === "idle" && (
          <p className="mb-7 text-base leading-7 text-slate-600">
            Your account has been created. Please check your email to activate
            your account before signing in.
          </p>
        )}

        {status === "loading" && (
          <p className="mb-7 text-base leading-7 text-slate-600">
            Activating your account...
          </p>
        )}

        {status === "success" && (
          <p className="mb-7 text-base leading-7 text-green-600">
            Your account is now active. You will be redirected to the login page
            shortly.
          </p>
        )}

        {status === "error" && (
          <p className="mb-7 text-base leading-7 text-red-600">{errorMsg}</p>
        )}

        {status === "expired" && (
          <>
            <p className="mb-3 text-base leading-7 text-red-600">{errorMsg}</p>
            <p className="mb-5 text-sm text-slate-600">
              You can request a new activation link to be sent to your email.
            </p>
            <button
              onClick={handleResend}
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
            >
              Resend Activation Link
            </button>
          </>
        )}

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-button-primary hover:bg-button-primary-hover text-white rounded-xl font-semibold no-underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
