import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Stethoscope, Brain, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const SymptomCheckerPage = () => {
  const { state, dispatch } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    en: {
      title: 'AI Symptom Checker',
      description: 'Describe your symptoms and get AI-powered analysis',
      placeholder: 'Describe your symptoms (e.g., "I have cough and chest pain")',
      analyze: 'Analyze Symptoms',
      analyzing: 'Analyzing...',
      specialist: 'Specialist',
      severity: 'Severity',
      summary: 'Summary',
      timestamp: 'Time',
      you: 'You',
      aiAnalysis: 'AI Analysis',
      chatHistory: 'Recent Queries',
      urgencyIndicator: 'Urgency Level',
      disclaimer: 'This is an AI suggestion, not a replacement for doctors.',
      disclaimerTitle: 'Important Notice'
    },
    hi: {
      title: 'AI लक्षण जांचकर्ता',
      description: 'अपने लक्षणों का वर्णन करें और AI-संचालित विश्लेषण प्राप्त करें',
      placeholder: 'अपने लक्षणों का वर्णन करें (जैसे, "मुझे खांसी और छाती में दर्द है")',
      analyze: 'लक्षणों का विश्लेषण करें',
      analyzing: 'विश्लेषण हो रहा है...',
      specialist: 'विशेषज्ञ',
      severity: 'गंभीरता',
      summary: 'सारांश',
      timestamp: 'समय',
      you: 'आप',
      aiAnalysis: 'AI विश्लेषण',
      chatHistory: 'हाल के प्रश्न',
      urgencyIndicator: 'तात्कालिकता स्तर',
      disclaimer: 'यह एक AI सुझाव है, डॉक्टरों का विकल्प नहीं।',
      disclaimerTitle: 'महत्वपूर्ण सूचना'
    },
    ta: {
      title: 'AI அறிகுறி சரிபார்ப்பு',
      description: 'உங்கள் அறிகுறிகளை விவரித்து AI-இயக்கப்பட்ட பகுப்பாய்வைப் பெறுங்கள்',
      placeholder: 'உங்கள் அறிகுறிகளை விவரிக்கவும் (எ.கா., "எனக்கு இருமல் மற்றும் மார்பு வலி உள்ளது")',
      analyze: 'அறிகுறிகளை பகுப்பாய்வு செய்',
      analyzing: 'பகுப்பாய்வு செய்கிறது...',
      specialist: 'நிபுணர்',
      severity: 'கடுமை',
      summary: 'சுருக்கம்',
      timestamp: 'நேரம்',
      you: 'நீங்கள்',
      aiAnalysis: 'AI பகுப்பாய்வு',
      chatHistory: 'சமீபத்திய கேள்விகள்',
      urgencyIndicator: 'அவசரநிலை நிலை',
      disclaimer: 'இது ஒரு AI பரிந்துரை, மருத்துவர்களுக்கு மாற்றாக அல்ல.',
      disclaimerTitle: 'முக்கியமான அறிவிப்பு'
    }
  };

  const t = translations[state.language] || translations.en;

  const mockAnalyzeSymptoms = async (symptoms) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = {
      specialist: 'Pulmonology',
      severity: 'Medium',
      summary: 'Possible pneumonia. Recommend chest X-ray.',
      confidence: 87,
      timestamp: new Date().toISOString()
    };

    return analysis;
  };

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    try {
      const analysis = await mockAnalyzeSymptoms(inputValue);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: analysis,
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyLevel = () => {
    const latestAnalysis = state.chatHistory
      .filter(msg => msg.type === 'ai')
      .slice(-1)[0];
    
    if (!latestAnalysis) return { level: 'Low', color: 'bg-green-500' };
    
    const severity = latestAnalysis.content.severity;
    if (severity === 'High') return { level: 'High', color: 'bg-red-500' };
    if (severity === 'Medium') return { level: 'Medium', color: 'bg-yellow-500' };
    return { level: 'Low', color: 'bg-green-500' };
  };

  const urgency = getUrgencyLevel();

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">{t.title}</CardTitle>
              <CardDescription className="text-lg">{t.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder={t.placeholder}
                  className="flex-1 text-lg"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !inputValue.trim()}
                  size="lg"
                  className="px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t.analyzing}</span>
                    </div>
                  ) : (
                    t.analyze
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Results */}
        <AnimatePresence>
          {state.chatHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {state.chatHistory.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'user' ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {message.type === 'user' ? (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">U</span>
                          </div>
                          <div>
                            <p className="font-medium text-blue-800">{t.you}:</p>
                            <p className="text-gray-700 mt-1">{message.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-green-800 mb-4">{t.aiAnalysis}:</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-600 mb-1">{t.specialist}</p>
                                <p className="font-semibold text-medical-blue">{message.content.specialist}</p>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-600 mb-1">{t.severity}</p>
                                <Badge className={`${getSeverityColor(message.content.severity)} text-white`}>
                                  {message.content.severity}
                                </Badge>
                              </div>
                              <div className="bg-white p-4 rounded-lg shadow-sm">
                                <p className="text-sm font-medium text-gray-600 mb-1">{t.timestamp}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(message.content.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <p className="text-sm font-medium text-gray-600 mb-2">{t.summary}</p>
                              <p className="text-gray-700">{message.content.summary}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Urgency Indicator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{t.urgencyIndicator}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${urgency.color}`} />
                <span className="font-semibold">{urgency.level}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chat History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{t.chatHistory}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.chatHistory.slice(-3).map((message) => (
                  <div key={message.id} className="text-sm">
                    <p className="font-medium text-gray-800 truncate">
                      {message.type === 'user' ? message.content : 'AI Analysis'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
                {state.chatHistory.length === 0 && (
                  <p className="text-gray-500 text-sm">No recent queries</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <CheckCircle className="w-5 h-5" />
                <span>{t.disclaimerTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-yellow-700">{t.disclaimer}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
