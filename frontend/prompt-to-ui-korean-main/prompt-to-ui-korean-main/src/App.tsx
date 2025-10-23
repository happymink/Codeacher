import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { CharacterProvider } from "@/contexts/CharacterContext";
import { PrivateRoute } from "@/components/layout/PrivateRoute";

// Pages
import Login from "./pages/Login";
import CharacterSelection from "./pages/CharacterSelection";
import Submit from "./pages/Submit";
import Loading from "./pages/Loading";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CharacterProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/character-selection" element={<PrivateRoute><CharacterSelection /></PrivateRoute>} />
                <Route path="/submit" element={<PrivateRoute><Submit /></PrivateRoute>} />
                <Route path="/loading/:submissionId" element={<PrivateRoute><Loading /></PrivateRoute>} />
                <Route path="/feedback/:id" element={<PrivateRoute><Feedback /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CharacterProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
