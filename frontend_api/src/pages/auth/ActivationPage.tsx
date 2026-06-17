import { Link } from "react-router-dom";

export default function ActivationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_16px_40px_rgba(16,24,40,0.08)] p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Account Created Successfully
        </h1>
        <p className="mb-7 text-base leading-7 text-slate-600">
          Your account has been created. Please check your email to activate
          your account before signing in.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-button-primary hover:bg-button-primary-hover text-white rounded-xl font-semibold no-underline"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}