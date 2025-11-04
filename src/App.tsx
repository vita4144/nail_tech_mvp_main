import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import TodayView from "./pages/TodayView";
import ClientList from "./pages/ClientList";
import AddClient from "./pages/AddClient";
import ClientDetails from "./pages/ClientDetails";
import AppointmentForm from "./pages/AppointmentForm";
import CalendarMonth from "./pages/CalendarMonth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/today" element={<TodayView />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<AddClient />} />
            <Route path="/clients/:id" element={<ClientDetails />} />
            <Route path="/appointments/new" element={<AppointmentForm />} />
            <Route path="/appointments/:id" element={<AppointmentForm />} />
            <Route path="/calendar" element={<CalendarMonth />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
