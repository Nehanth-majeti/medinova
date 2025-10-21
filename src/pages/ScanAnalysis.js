import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Upload, ToggleLeft, ToggleRight, AlertTriangle, DollarSign, Thermometer, CheckCircle, ThumbsUp, ThumbsDown, FileText, Eye, EyeOff } from 'lucide-react';

const ScanAnalysis = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const [doctorFeedback, setDoctorFeedback] = useState({});
  const [totalSavings, setTotalSavings] = useState(0);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setIsAnalyzing(true);
      
      // Simulate analysis delay
      setTimeout(() => {
        const newScans = files.map((file, index) => ({
          id: Date.now() + index,
          fileName: file.name,
          condition: 'Pneumonia',
          confidence: 92,
          urgency: 'High',
          riskLevel: 'Moderate',
          highlightedRegion: 'Suspicious patch detected in left lung',
          suggestedAction: 'Consult Pulmonologist immediately',
          timestamp: new Date().toISOString()
        }));
        
        setUploadedFiles(prev => [...prev, ...newScans]);
        setCurrentScan(newScans[0]);
        setTotalSavings(prev => prev + 200);
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const handleFeedback = (scanId, feedback) => {
    setDoctorFeedback(prev => ({
      ...prev,
      [scanId]: feedback
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Demo Badge */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">DEMO — Image Analysis Simulated</span>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Scan Analysis</h2>
          <p className="text-lg text-gray-600">Upload medical images for AI-powered diagnosis</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Scans</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Upload Medical Images</p>
                <p className="text-sm text-gray-500 mb-4">Drag & drop or click to select files</p>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Choose Files
                </button>
              </label>
            </div>
            
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-blue-700">Analyzing images...</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Image Display with Heatmap */}
          {currentScan && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Scan Analysis</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
              </h3>
              
              <div className="relative bg-gray-100 rounded-lg p-4">
                <div className="relative inline-block">
                  <img 
                    src="/assets/xray.svg" 
                    alt="Chest X-ray" 
                    className="w-80 h-60 rounded-lg border-2 border-gray-300"
                  />
                  
                  {/* Heatmap Overlay */}
                  <AnimatePresence>
                    {showHeatmap && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 rounded-lg"
                      >
                        <img 
                          src="/assets/heatmap.svg" 
                          alt="Heatmap Overlay" 
                          className="w-80 h-60 rounded-lg opacity-80"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Heatmap Toggle */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                      showHeatmap
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {showHeatmap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showHeatmap ? 'Hide' : 'Show'} Heatmap</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Panel - Insights and Feedback */}
        <div className="space-y-6">
          {/* Scan Insights */}
          {currentScan && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Scan Insights</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
              </h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-red-800">Predicted Condition</span>
                  </div>
                  <p className="text-lg font-bold text-red-700">{currentScan.condition}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Confidence</span>
                      <span>{currentScan.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${currentScan.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-red-500 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-800">Urgency Level</span>
                  </div>
                  <p className="text-lg font-bold text-orange-700">{currentScan.urgency}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-800">Highlighted Region</h4>
                    <p className="text-sm text-blue-700">{currentScan.highlightedRegion}</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-800">Suggested Action</h4>
                    <p className="text-sm text-green-700">{currentScan.suggestedAction}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cost Savings Tracker */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Cost Savings Tracker</span>
            </h3>
            
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-600">₹{totalSavings}</div>
              <p className="text-sm text-gray-600">Total Saved</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>This scan saved:</span>
                <span className="font-semibold text-green-600">₹200</span>
              </div>
              <div className="flex justify-between">
                <span>Cloud API cost:</span>
                <span className="text-gray-600">₹2000</span>
              </div>
              <div className="flex justify-between">
                <span>MediNova cost:</span>
                <span className="text-gray-600">₹200</span>
              </div>
            </div>
          </motion.div>

          {/* Doctor Feedback */}
          {currentScan && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Doctor Feedback</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
              </h3>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Was this diagnosis helpful?</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleFeedback(currentScan.id, 'correct')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      doctorFeedback[currentScan.id] === 'correct'
                        ? 'bg-green-100 text-green-800 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Correct</span>
                  </button>
                  <button
                    onClick={() => handleFeedback(currentScan.id, 'incorrect')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      doctorFeedback[currentScan.id] === 'incorrect'
                        ? 'bg-red-100 text-red-800 border-2 border-red-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>Incorrect</span>
                  </button>
                </div>
                
                {doctorFeedback[currentScan.id] && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <p className="text-sm text-blue-800">
                      Thank you for your feedback! This helps improve our AI model.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Analysis Results History */}
      {uploadedFiles.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Analysis History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((scan) => (
              <motion.div 
                key={scan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{scan.condition}</p>
                    <p className="text-sm text-gray-600">{scan.fileName}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                    {scan.confidence}% confidence
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${scan.confidence}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Confidence Level</span>
                  <span>{scan.confidence}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ScanAnalysis;
