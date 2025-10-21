import React, { useState } from 'react';
import { Stethoscope, Brain, Clock, AlertTriangle } from 'lucide-react';

const SymptomChecker = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return;

    setIsAnalyzing(true);
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI analysis delay
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: {
          specialist: 'Pulmonology',
          severity: 'Medium',
          summary: 'Possible pneumonia. Recommend chest X-ray.',
          confidence: 87
        },
        timestamp: new Date().toISOString()
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
      setIsAnalyzing(false);
      setInputValue('');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Demo Badge */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">DEMO — AI Analysis Simulated</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Symptom Checker</h2>
            <p className="text-lg text-gray-600">Describe your symptoms and get AI-powered analysis</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Enter your symptoms..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg"
              disabled={isAnalyzing}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputValue.trim()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {chatHistory.length > 0 && (
          <div className="space-y-4">
            {chatHistory.map((message) => (
              <div key={message.id}>
                {message.type === 'user' ? (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">U</span>
                      </div>
                      <div>
                        <p className="font-medium text-blue-800">You:</p>
                        <p className="text-gray-700 mt-1">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-green-800 mb-4">AI Analysis:</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-gray-600 mb-1">Specialist</p>
                            <p className="font-semibold text-blue-600">{message.content.specialist}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-gray-600 mb-1">Severity</p>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                              {message.content.severity}
                            </span>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm font-medium text-gray-600 mb-1">Confidence</p>
                            <p className="font-semibold text-green-600">{message.content.confidence}%</p>
                          </div>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-sm font-medium text-gray-600 mb-2">Summary</p>
                          <p className="text-gray-700">{message.content.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Urgency Indicator */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Urgency Level</span>
          </h3>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="font-semibold">Medium</span>
          </div>
        </div>

        {/* Chat History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Queries</span>
          </h3>
          <div className="space-y-3">
            {chatHistory.slice(-3).map((message) => (
              <div key={message.id} className="text-sm">
                <p className="font-medium text-gray-800 truncate">
                  {message.type === 'user' ? message.content : 'AI Analysis'}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
            {chatHistory.length === 0 && (
              <p className="text-gray-500 text-sm">No recent queries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
