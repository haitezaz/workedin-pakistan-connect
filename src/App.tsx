
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Worker Pages
import WorkerJobs from "./pages/worker/WorkerJobs";
import WorkerGigs from "./pages/worker/WorkerGigs";
import WorkerProfile from "./pages/worker/WorkerProfile";

// Employer Pages
import EmployerPost from "./pages/employer/EmployerPost";
import EmployerDashboard from "./pages/employer/EmployerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Worker Routes */}
            <Route path="/worker/jobs" element={<WorkerJobs />} />
            <Route path="/worker/gigs" element={<WorkerGigs />} />
            <Route path="/worker/profile" element={<WorkerProfile />} />
            
            {/* Employer Routes */}
            <Route path="/employer/post" element={<EmployerPost />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
