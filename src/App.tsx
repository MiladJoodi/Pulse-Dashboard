import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from './components/Toast';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { DashboardLayout } from './components/dashboard/DashboardLayout';

const AppContent: React.FC = () => {
  const { user, authView } = useAuth();

  // If authenticated, render Dashboard
  if (user) {
    return <DashboardLayout />;
  }

  // Otherwise render Auth Screens
  switch (authView) {
    case 'register':
      return <RegisterForm />;
    case 'forgot-password':
      return <ForgotPasswordForm />;
    case 'login':
    default:
      return <LoginForm />;
  }
};

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <AppContent />
    </AuthProvider>
  );
}
