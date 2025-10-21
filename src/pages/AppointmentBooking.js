import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle, AlertTriangle, User, Star, MapPin, Stethoscope } from 'lucide-react';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calendar data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isAvailable = Math.random() > 0.3; // Random availability
    calendarDays.push({
      day,
      available: isAvailable,
      isToday: day === currentDate.getDate()
    });
  }

  // Doctor slots data
  const doctorSlots = [
    { id: 1, time: '10:00 AM', doctor: 'Dr. Mehta', specialty: 'Pulmonology', hospital: 'CityCare Hospital', available: true },
    { id: 2, time: '11:00 AM', doctor: 'Dr. Mehta', specialty: 'Pulmonology', hospital: 'CityCare Hospital', available: true },
    { id: 3, time: '12:00 PM', doctor: 'Dr. Mehta', specialty: 'Pulmonology', hospital: 'CityCare Hospital', available: false },
    { id: 4, time: '1:00 PM', doctor: 'Dr. Mehta', specialty: 'Pulmonology', hospital: 'CityCare Hospital', available: true },
    { id: 5, time: '2:00 PM', doctor: 'Dr. Mehta', specialty: 'Pulmonology', hospital: 'CityCare Hospital', available: true }
  ];

  const handleDateClick = (day) => {
    if (day && day.available) {
      setSelectedDate(day);
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.available && !bookedSlots.includes(slot.id)) {
      setSelectedSlot(slot);
      setShowConfirmation(true);
    }
  };

  const confirmBooking = () => {
    if (selectedSlot) {
      setBookedSlots(prev => [...prev, selectedSlot.id]);
      setShowConfirmation(false);
      setShowSuccess(true);
      setSelectedSlot(null);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Demo Badge */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span className="font-medium text-yellow-800">DEMO — Booking System Simulated</span>
        </div>
      </div>

      {/* Hero Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8 bg-gradient-to-r from-green-50 to-blue-50"
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Appointment Booking</h2>
          <p className="text-lg text-gray-600">Schedule your consultation with our specialists</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Widget */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Select Date</span>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
            </h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-800">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h4>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  disabled={!day || !day.available}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !day
                      ? 'invisible'
                      : day.isToday
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : day.available
                      ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {day?.day}
                </button>
              ))}
            </div>
            
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span className="text-gray-600">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <span className="text-gray-600">Unavailable</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Doctor Profile Card */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <h3 className="text-xl font-semibold">Doctor Profile</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">DEMO</span>
            </div>
            
            <div className="flex items-start space-x-4">
              <img 
                src="/assets/doctor.svg" 
                alt="Dr. Mehta" 
                className="w-20 h-20 rounded-full border-2 border-gray-200"
              />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">Dr. Rajesh Mehta</h4>
                <p className="text-blue-600 font-medium">Pulmonology Specialist</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8 (127 reviews)</span>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>CityCare Hospital</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600">Experience: 12 years</p>
                  <p className="text-sm text-gray-600">Qualification: MD, Pulmonology</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Available Time Slots for {selectedDate.day} {currentDate.toLocaleDateString('en-US', { month: 'long' })}</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctorSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot.id);
              return (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSlotClick(slot)}
                  disabled={!slot.available || isBooked}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    isBooked
                      ? 'bg-green-100 border-green-500 text-green-800 cursor-not-allowed'
                      : slot.available
                      ? 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xl font-semibold mb-2">{slot.time}</div>
                    <div className="text-sm text-gray-600 mb-1">{slot.doctor}</div>
                    <div className="text-xs text-gray-500 mb-2">{slot.hospital}</div>
                    {isBooked ? (
                      <div className="flex items-center justify-center space-x-1 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Booked</span>
                      </div>
                    ) : slot.available ? (
                      <div className="text-sm text-green-600 font-medium">Available</div>
                    ) : (
                      <div className="text-sm text-red-600 font-medium">Booked</div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Booked Appointments */}
      {bookedSlots.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Your Appointments</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookedSlots.map((slotId) => {
              const slot = doctorSlots.find(s => s.id === slotId);
              return (
                <motion.div 
                  key={slotId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-800">{slot.doctor}</p>
                      <p className="text-green-600 text-sm">{slot.specialty}</p>
                      <p className="text-green-600 text-sm">{slot.time}</p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Appointment confirmed with Dr. Mehta at {selectedSlot?.time}!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && selectedSlot && (
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
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Appointment</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Doctor:</span>
                    <span>{selectedSlot.doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Specialty:</span>
                    <span>{selectedSlot.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{selectedSlot.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{selectedDate?.day} {currentDate.toLocaleDateString('en-US', { month: 'long' })}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentBooking;
