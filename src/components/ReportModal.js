import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Download, ThumbsUp, ThumbsDown, FileText, Thermometer, AlertTriangle } from 'lucide-react';

const ReportModal = ({ scan, isOpen, onClose, onFeedback }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (type) => {
    setFeedback(type);
    onFeedback(scan.id, type);
  };

  const downloadReferral = () => {
    // Create a link to download the static PDF
    const link = document.createElement('a');
    link.href = '/assets/referral.pdf';
    link.download = `referral-${scan.condition.toLowerCase()}-${scan.date}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen || !scan) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Scan Report</h2>
                <p className="text-sm text-gray-600">{scan.condition} - {scan.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO VERSION</span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <span>Medical Image</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
                </h3>
                <div className="relative bg-gray-100 rounded-lg p-4">
                  <div className="relative inline-block">
                    <img 
                      src="/assets/xray.svg" 
                      alt="Chest X-ray" 
                      className="w-full max-w-md rounded-lg border-2 border-gray-300"
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
                            className="w-full max-w-md rounded-lg opacity-80"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
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
              </div>

              {/* Analysis Section */}
              <div className="space-y-6">
                {/* Condition & Confidence */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Thermometer className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-red-800">Predicted Condition</span>
                  </div>
                  <p className="text-xl font-bold text-red-700 mb-3">{scan.condition}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span className="font-semibold">{scan.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${scan.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-red-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-800">Urgency Level</span>
                  </div>
                  <p className="text-lg font-bold text-orange-700">{scan.urgency}</p>
                </div>

                {/* Insights */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">AI Insights</h4>
                  <p className="text-sm text-blue-700 mb-2">{scan.insights}</p>
                  <p className="text-sm text-blue-600 font-medium">{scan.suggestedAction}</p>
                </div>

                {/* Doctor Notes */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Doctor Notes (Mock)</h4>
                  <p className="text-sm text-gray-700">
                    "This is a demo report. Final diagnosis should be made by a clinician. 
                    The AI analysis shows potential indicators that warrant further investigation."
                  </p>
                </div>

                {/* Feedback */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">Doctor Feedback</h4>
                  <p className="text-sm text-green-700 mb-3">Was this diagnosis helpful?</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleFeedback('correct')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        feedback === 'correct'
                          ? 'bg-green-100 text-green-800 border-2 border-green-300'
                          : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Correct</span>
                    </button>
                    <button
                      onClick={() => handleFeedback('incorrect')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        feedback === 'incorrect'
                          ? 'bg-red-100 text-red-800 border-2 border-red-300'
                          : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Incorrect</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2">DEMO</span>
                  This is a demo report. Final diagnosis should be made by a clinician.
                </div>
                <button
                  onClick={downloadReferral}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Referral PDF</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReportModal;
