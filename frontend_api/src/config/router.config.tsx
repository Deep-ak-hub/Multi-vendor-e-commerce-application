import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import AuthLayoutPage from "../pages/layouts/AuthLayoutPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthLayoutPage />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forget-password" element={<ForgetPasswordPage />} />
      </Route>

      {/* Error Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
