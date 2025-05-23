import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppRoute from "./routes/AppRoutes";
import { SidebarProvider } from "./context/SidebarContext";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// PublicRoute component (redirects if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  return isAuthenticated() ? <Navigate to="/patient-dashboard" replace /> : children;
};

function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegistrationPage /></PublicRoute>} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <SidebarProvider>
              <AppRoute />
            </SidebarProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" // or "dark" or "colored"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
