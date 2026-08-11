import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Analytics from "../pages/Analytics";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import ProtectedRoute from "./ProtectedRoute";
import PaymentSuccess from "../pages/PaymentSuccess";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
