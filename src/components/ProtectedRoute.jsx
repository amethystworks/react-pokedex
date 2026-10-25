import { Navigate, Outlet } from "react-router";
import { getToken } from "../utils/auth";

// No login info -> redirect to Login
export default function ProtectedRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/login" replace />;
}
