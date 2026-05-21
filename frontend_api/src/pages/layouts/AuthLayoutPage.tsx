import { Outlet } from "react-router";
import AuthLeftSidePanel from "../../components/auth/AuthLeftSidePanel";

export default function AuthLayoutPage() {
  return (
    <>
      <div className="flex w-full grow h-screen">
        <AuthLeftSidePanel />

        <div className="w-3/4 flex items-center justify-center bg-primary-700">
          <Outlet />
        </div>
      </div>
    </>
  );
}
