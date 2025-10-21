import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, Calendar, Brain, Activity, Wifi, WifiOff, Globe, LogOut, User, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Layout = ({ children }) => {
  const { state, dispatch } = useApp();
  const { currentUser, logout } = useAuth();

  const tabs = [
    { id: 'symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
    { id: 'appointment-booking', label: 'Appointment Booking', icon: Calendar },
    { id: 'scan-analysis', label: 'Scan Analysis', icon: Brain },
    { id: 'dashboard', label: 'Dashboard', icon: Activity }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Main Navigation Header - Based on Image Reference */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-blue-50 shadow-sm border-b"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand Identity - Left Section */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">MediNova</h1>
                <p className="text-xs text-gray-600">AI-Powered Healthcare</p>
              </div>
            </motion.div>
            
            {/* Navigation Links - Center Section */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Features
              </a>
              <a href="#patient-journey" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Patient Journey
              </a>
              <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Impact
              </a>
              <a href="#scalability" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Scalability
              </a>
            </nav>

            {/* User Actions - Right Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <select
                value={state.language}
                onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
                className="bg-white/80 text-gray-700 rounded-lg px-3 py-1 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-gray-800">
                    {lang.name}
                  </option>
                ))}
              </select>
              
              {/* Offline Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'TOGGLE_OFFLINE' })}
                className="text-gray-600 hover:bg-gray-100"
              >
                {state.isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
              </Button>
              
              {/* Offline Badge */}
              {state.isOffline && (
                <Badge variant="secondary" className="bg-yellow-500 text-white">
                  Offline Mode
                </Badge>
              )}

              {/* User Info and Sign Out */}
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {currentUser?.displayName || currentUser?.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-600 hover:bg-gray-100"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => window.location.href = '/#signin'}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <Button 
                    onClick={() => window.location.href = '/#signup'}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Application Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: tab.id })}
                  className={`flex-1 py-4 px-4 text-center font-medium transition-all duration-200 ${
                    state.currentPage === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.main 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
