import { AuthProvider, useAuth } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import Navbar from "./components/common/Navbar";
import { Navigate, Route, Routes} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingSpinner from "./components/common/LoadSpinner";
import LoginForm from "./components/auth/LoginForm";
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import MessagesPage from "./pages/MessagesPage";
import MessagePage from "./pages/MessagePage";
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route component (redirect if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
};
const AppContent: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/developers" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Developers Page - Coming Soon!</h1>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Projects Page - Coming Soon!</h1>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Profile Page - Coming Soon!</h1>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Settings Page - Coming Soon!</h1>
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
             <MessagesPage/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages/:id" 
          element={
            <ProtectedRoute>
             <MessagePage/>
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </>
  );
};
function App() {

  return (
    <>
     <ThemeProvider>
      <AuthProvider>
        <Router >
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
