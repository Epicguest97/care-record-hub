
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import PatientRegistration from "./pages/admin/PatientRegistration";
import Billing from "./pages/admin/Billing";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/Dashboard";
import PatientRecords from "./pages/doctor/PatientRecords";

// Patient Pages
import PatientDashboard from "./pages/patient/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/patients/add" element={<PatientRegistration />} />
              <Route path="/admin/billing" element={<Billing />} />
            </Route>
            
            {/* Doctor Routes */}
            <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/records" element={<PatientRecords />} />
            </Route>
            
            {/* Patient Routes */}
            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
            </Route>
            
            {/* Redirects */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
