import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Calendar, Heart } from 'lucide-react';

const PatientCard = ({ patient }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
    >
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src="/assets/patient-photo.svg" 
          alt="Patient Photo" 
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
          <p className="text-gray-600">{patient.age} years old</p>
          <div className="flex items-center space-x-1 mt-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">Patient ID: #P{patient.age}001</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{patient.contact}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Mail className="w-4 h-4" />
          <span>{patient.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Last visit: {patient.recentVisitDate}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent Symptoms</h4>
        <div className="flex flex-wrap gap-2">
          {patient.recentSymptoms.map((symptom, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
            >
              {symptom}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PatientCard;
