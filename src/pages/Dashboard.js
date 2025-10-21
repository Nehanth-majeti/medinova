import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Stethoscope, Calendar, Brain, FileText, Download, BarChart, PieChart, MessageSquare, Clock, AlertTriangle, User, Phone, Mail, Heart, Eye, EyeOff, ThumbsUp, ThumbsDown, Thermometer } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { patientData } from '../data/patientData';
import PatientCard from '../components/PatientCard';
import AppointmentCard from '../components/AppointmentCard';
import AuditList from '../components/AuditList';
import ReportModal from '../components/ReportModal';

const Dashboard = () => {
  const { state, dispatch } = useApp();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [patient, setPatient] = useState(patientData);
  const [doctorFeedback, setDoctorFeedback] = useState({});

  // Early return if patient data is not available
  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">MediNova</h2>
          <p className="text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }
  
  const handleReschedule = (appointmentId, newSlot) => {
    // Update local patient state
    setPatient(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, datetime: `2025-09-20 ${newSlot.time}`, status: 'rescheduled' }
          : apt
      )
    }));
    
    // Also update context state
    dispatch({
      type: 'ADD_CHAT_MESSAGE',
      payload: {
        id: Date.now(),
        type: 'system',
        content: `Appointment rescheduled to ${newSlot.time}`,
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleViewReport = (scan) => {
    setSelectedScan(scan);
    setShowReportModal(true);
  };

  const handleFeedback = (scanId, feedback) => {
    setDoctorFeedback(prev => ({
      ...prev,
      [scanId]: feedback
    }));
  };

  const generateReferralPDF = () => {
    const link = document.createElement('a');
    link.href = '/assets/referral.pdf';
    link.download = 'medinova-referral.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Demo Badge */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">DEMO — All Data Simulated</span>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Patient Dashboard</h2>
          <p className="text-lg text-gray-600">Comprehensive overview of your healthcare journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <PatientCard patient={patient} />
            
            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Book Appointment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800 font-medium">Upload Scan</span>
                </button>
                <button 
                  onClick={generateReferralPDF}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Download Referral</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Chat Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Recent Chat Summary</span>
                </h3>
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View full chat →
                </button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Last chat:</span> "Chest pain, cough" → Specialist: Pulmonology → Severity: Medium
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <span>AI Analysis: Medium severity</span>
                      <span>•</span>
                      <span>Recommendation: Consult Pulmonologist</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Appointment */}
            {patient.appointments.find(apt => apt.status === 'upcoming') && (
              <AppointmentCard 
                appointment={patient.appointments.find(apt => apt.status === 'upcoming')} 
                onReschedule={handleReschedule}
              />
            )}

            {/* Scan Reports */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Recent Scan Reports</span>
              </h3>
              
              <div className="space-y-4">
                {(patient.scans && patient.scans.length > 0) || (state.scans && state.scans.length > 0) ? 
                  (patient.scans || state.scans || []).map((scan) => (
                  <motion.div 
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img 
                      src="/assets/xray.svg" 
                      alt="Scan thumbnail" 
                      className="w-16 h-16 rounded-lg border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-800">{scan.condition}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(scan.urgency)}`}>
                          {scan.urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Confidence: {scan.confidence}% • {scan.date}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${scan.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewReport(scan)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Report
                    </button>
                  </motion.div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No scan reports available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Analytics & Utilities */}
          <div className="lg:col-span-1 space-y-6">
            {/* Urgency Snapshot */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Urgency Snapshot</span>
              </h3>
              
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold border-2 ${getUrgencyColor(patient.urgencyScore)}`}>
                  {patient.urgencyScore}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span> Combined symptom + scan score
                </p>
              </div>
            </motion.div>


            {/* Health Timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Health Timeline</span>
              </h3>
              
              <div className="space-y-3">
                {patient.healthTimeline && patient.healthTimeline.length > 0 ? patient.healthTimeline.slice(0, 6).map((event, index) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{event.event}</p>
                      <p className="text-xs text-gray-500">{event.timestamp}</p>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-4 text-gray-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No timeline events available</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Audit & Consent */}
            <AuditList auditEntries={patient.audit || state.auditTrail || []} />
          </div>
        </div>
      </div>

      {/* Chat History Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Chat History</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-gray-500">×</span>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {(patient.chatHistory && patient.chatHistory.length > 0) || (state.chatHistory && state.chatHistory.length > 0) ? 
                  (patient.chatHistory || state.chatHistory || []).map((message) => (
                  <div key={message.id} className={`flex ${message.user === 'Patient' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.user === 'Patient' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No chat history available</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Modal */}
      <ReportModal 
        scan={selectedScan}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onFeedback={handleFeedback}
      />
    </div>
  );
};

export default Dashboard;