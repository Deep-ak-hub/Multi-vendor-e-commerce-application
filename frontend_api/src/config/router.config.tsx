import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/ForgetPasswordPage"));
const AuthLayoutPage = lazy(() => import("../pages/layouts/AuthLayoutPage"));
const AdminLayoutPage = lazy(() => import("../pages/layouts/AdminLayoutPage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const ActivationPendingPage = lazy(() => import("../pages/auth/ActivationPendingPage"));
const Products = lazy(() => import("../pages/product/ProductsPage"));

const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AuthLayoutPage />}>
          <Route index={true} element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route path="/activate-pending" element={<ActivationPendingPage />} />
        <Route path="/admin" element={<AdminLayoutPage />}>
          <Route index={true} element={<AdminDashboardPage />} />
        </Route>

        <Route path="/products" element={<Products />} />

        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
