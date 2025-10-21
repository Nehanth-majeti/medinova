import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Activity, FileText, Download, TrendingUp, Users, Brain, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const { state } = useApp();
  const [showReportModal, setShowReportModal] = useState(false);

  const getStats = () => {
    const totalScans = state.scans.length;
    const avgConfidence = totalScans > 0 
      ? Math.round(state.scans.reduce((sum, scan) => sum + scan.confidence, 0) / totalScans)
      : 0;
    
    const urgencyDistribution = {
      high: state.scans.filter(scan => scan.confidence >= 90).length,
      medium: state.scans.filter(scan => scan.confidence >= 70 && scan.confidence < 90).length,
      low: state.scans.filter(scan => scan.confidence < 70).length
    };

    return {
      totalScans,
      avgConfidence,
      totalSavings: state.totalSavings,
      urgencyDistribution
    };
  };

  const stats = getStats();

  const urgencyData = [
    { name: 'High', value: stats.urgencyDistribution.high, color: '#ef4444' },
    { name: 'Medium', value: stats.urgencyDistribution.medium, color: '#facc15' },
    { name: 'Low', value: stats.urgencyDistribution.low, color: '#10b981' }
  ];

  const costComparisonData = [
    { name: 'Cloud API', cost: state.scans.length * 2000 },
    { name: 'MediNova', cost: state.scans.length * 200 }
  ];

  const downloadPDF = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'medinova-referral-report.pdf';
    link.click();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">Patient Dashboard</CardTitle>
            <CardDescription className="text-lg">Comprehensive overview of your healthcare journey</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Scans</p>
                  <p className="text-2xl font-bold">{stats.totalScans}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                  <p className="text-2xl font-bold">{stats.avgConfidence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Appointments</p>
                  <p className="text-2xl font-bold">{state.appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Savings</p>
                  <p className="text-2xl font-bold">₹{stats.totalSavings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Urgency Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Urgency Distribution</CardTitle>
              <CardDescription>Distribution of scan urgency levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={urgencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {urgencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cost Comparison</CardTitle>
              <CardDescription>Cloud API vs MediNova costs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar dataKey="cost" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest healthcare actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.auditTrail.slice(-5).map((action, index) => (
                <div key={action.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.action}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(action.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Generate Referral Report</CardTitle>
            <CardDescription>Create a comprehensive report for your healthcare provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button onClick={() => setShowReportModal(true)} className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Generate Report</span>
              </Button>
              <Button variant="outline" onClick={downloadPDF} className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Referral Report</span>
            </DialogTitle>
            <DialogDescription>
              Comprehensive medical report for healthcare provider
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Patient Info */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="font-semibold">[Patient Name]</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Symptoms */}
            {state.chatHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Symptoms & Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.chatHistory.filter(msg => msg.type === 'ai').slice(-1).map((msg) => (
                    <div key={msg.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Specialist:</span>
                        <span>{msg.content.specialist}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Severity:</span>
                        <Badge className="bg-yellow-500 text-white">{msg.content.severity}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">Summary:</span>
                        <p className="mt-1">{msg.content.summary}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Scan Results */}
            {state.scans.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Scan Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.scans.map((scan) => (
                      <div key={scan.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{scan.condition}</span>
                          <Badge className="bg-green-500 text-white">
                            {Math.round(scan.confidence)}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{scan.fileName}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Appointments */}
            {state.appointments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {state.appointments.map((apt) => (
                    <div key={apt.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{apt.specialist}</p>
                        <p className="text-sm text-gray-600">{apt.time} • {apt.date}</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Confirmed</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button variant="outline" onClick={() => setShowReportModal(false)}>
              Close
            </Button>
            <Button onClick={downloadPDF} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;