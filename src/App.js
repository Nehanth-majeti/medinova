import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SymptomChecker from './pages/SymptomChecker';
import AppointmentBooking from './pages/AppointmentBooking';
import ScanAnalysis from './pages/ScanAnalysis';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { currentUser } = useAuth();
  const { state } = useApp();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [hasRedirected, setHasRedirected] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  // Handle post-login redirection to demo.html
  useEffect(() => {
    if (currentUser && !hasRedirected) {
      setHasRedirected(true);
      // Redirect to demo.html after successful login
      window.location.href = '/demo.html';
    }
  }, [currentUser, hasRedirected]);

  // Handle navigation from landing page
  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuth(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuth(true);
  };

  // If user is authenticated, show the main app
  if (currentUser) {
    return (
      <Layout>
        <MainApp />
      </Layout>
    );
  }

  // If user wants to authenticate, show auth forms
  if (showAuth) {
    return authMode === 'signin' ? 
      <SignIn onToggleMode={() => setAuthMode('signup')} /> : 
      <SignUp onToggleMode={() => setAuthMode('signin')} />;
  }

  // Show landing page for non-authenticated users
  return <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
}

function MainApp() {
  const { state } = useApp();
  
  switch (state.currentPage) {
    case 'symptom-checker':
      return <SymptomChecker />;
    case 'appointment-booking':
      return <AppointmentBooking />;
    case 'scan-analysis':
      return <ScanAnalysis />;
    case 'dashboard':
      return <Dashboard />;
    default:
      return <Dashboard />;
  }
}

export default App;