import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  // Navigation
  currentPage: 'symptom-checker',
  
  // Chat/Symptom Checker
  chatHistory: [],
  
  // Appointments
  appointments: [],
  availableSlots: [
    { id: 1, time: '10:00 AM', available: true },
    { id: 2, time: '11:00 AM', available: true },
    { id: 3, time: '12:00 PM', available: true },
    { id: 4, time: '1:00 PM', available: true },
    { id: 5, time: '2:00 PM', available: true }
  ],
  
  // Scans
  scans: [],
  totalSavings: 0,
  
  // UI State
  language: 'en',
  isOffline: false,
  showHeatmap: false,
  
  // Audit Trail
  auditTrail: [],
  
  // Doctor Feedback
  feedback: {}
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
        auditTrail: [...state.auditTrail, {
          id: Date.now(),
          action: `Navigated to ${action.payload}`,
          timestamp: new Date().toISOString()
        }]
      };
      
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
        auditTrail: [...state.auditTrail, {
          id: Date.now(),
          action: 'Symptom entered',
          timestamp: new Date().toISOString()
        }]
      };
      
    case 'BOOK_APPOINTMENT':
      const updatedSlots = state.availableSlots.map(slot => 
        slot.id === action.payload.slotId 
          ? { ...slot, available: false }
          : slot
      );
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        availableSlots: updatedSlots,
        auditTrail: [...state.auditTrail, {
          id: Date.now(),
          action: 'Appointment booked',
          timestamp: new Date().toISOString()
        }]
      };
      
    case 'ADD_SCAN':
      return {
        ...state,
        scans: [...state.scans, action.payload],
        totalSavings: state.totalSavings + 200,
        auditTrail: [...state.auditTrail, {
          id: Date.now(),
          action: 'Scan uploaded',
          timestamp: new Date().toISOString()
        }]
      };
      
    case 'BATCH_UPLOAD':
      return {
        ...state,
        scans: [...state.scans, ...action.payload],
        totalSavings: state.totalSavings + (action.payload.length * 200),
        auditTrail: [...state.auditTrail, {
          id: Date.now(),
          action: `Batch upload: ${action.payload.length} scans`,
          timestamp: new Date().toISOString()
        }]
      };
      
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
      
    case 'TOGGLE_OFFLINE':
      return {
        ...state,
        isOffline: !state.isOffline
      };
      
    case 'TOGGLE_HEATMAP':
      return {
        ...state,
        showHeatmap: !state.showHeatmap
      };
      
    case 'ADD_FEEDBACK':
      return {
        ...state,
        feedback: {
          ...state.feedback,
          [action.payload.scanId]: action.payload.feedback
        }
      };
      
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
