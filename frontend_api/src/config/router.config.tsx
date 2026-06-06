import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import AuthLayoutPage from "../pages/layouts/AuthLayoutPage";
import AdminLayoutPage from "../pages/layouts/AdminLayoutPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayoutPage />}>
        <Route index={true} element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forget-password" element={<ForgetPasswordPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayoutPage />}>
        <Route index={true} element={<AdminDashboardPage />} />
      </Route>

      {/* Error Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
