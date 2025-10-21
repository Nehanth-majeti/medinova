import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertTriangle, Upload, Download } from 'lucide-react';

const AuditList = ({ auditEntries }) => {
  const getEventIcon = (event) => {
    if (event.includes('Consent')) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (event.includes('Scan')) return <Upload className="w-4 h-4 text-blue-500" />;
    if (event.includes('Report')) return <FileText className="w-4 h-4 text-purple-500" />;
    if (event.includes('Appointment')) return <Clock className="w-4 h-4 text-orange-500" />;
    if (event.includes('Referral')) return <Download className="w-4 h-4 text-indigo-500" />;
    return <AlertTriangle className="w-4 h-4 text-gray-500" />;
  };

  const getEventColor = (event) => {
    if (event.includes('Consent')) return 'text-green-700';
    if (event.includes('Scan')) return 'text-blue-700';
    if (event.includes('Report')) return 'text-purple-700';
    if (event.includes('Appointment')) return 'text-orange-700';
    if (event.includes('Referral')) return 'text-indigo-700';
    return 'text-gray-700';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Audit & Consent</h3>
      </div>

      <div className="space-y-3">
        {auditEntries.slice(0, 5).map((entry, index) => (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-shrink-0 mt-1">
              {getEventIcon(entry.event || entry.action)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${getEventColor(entry.event || entry.action)}`}>
                {entry.event || entry.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View full audit trail →
        </button>
      </div>
    </motion.div>
  );
};

export default AuditList;
