import AuthLeftSidePanel from "./components/auth/AuthLeftSidePanel";
import LoginPage from "./pages/LoginPage";

export function App() {
  return (
    <>
    <div className="flex w-full h-screen">
      <AuthLeftSidePanel />
      <LoginPage />
    </div>
    </>
  )
}
