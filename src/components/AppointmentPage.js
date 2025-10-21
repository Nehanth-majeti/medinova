import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Calendar, Clock, User, CheckCircle, Users, Activity } from 'lucide-react';

const AppointmentBookingPage = () => {
  const { state, dispatch } = useApp();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const translations = {
    en: {
      title: 'Appointment Booking',
      description: 'Schedule your consultation with our specialists',
      availableSlots: 'Available Time Slots',
      selectSlot: 'Select a time slot for your consultation',
      specialist: 'Pulmonologist',
      confirmAppointment: 'Confirm Appointment',
      cancel: 'Cancel',
      confirm: 'Confirm Booking',
      yourAppointments: 'Your Appointments',
      doctorAvailability: 'Doctor\'s Availability',
      patientsSeen: 'Patients seen today',
      totalCapacity: 'Total capacity',
      timeSlot: 'Time Slot',
      date: 'Date',
      status: 'Status',
      booked: 'Booked',
      available: 'Available'
    },
    hi: {
      title: 'अपॉइंटमेंट बुकिंग',
      description: 'हमारे विशेषज्ञों के साथ अपनी परामर्श की तारीख तय करें',
      availableSlots: 'उपलब्ध समय स्लॉट',
      selectSlot: 'अपनी परामर्श के लिए एक समय स्लॉट चुनें',
      specialist: 'फुफ्फुस विशेषज्ञ',
      confirmAppointment: 'अपॉइंटमेंट की पुष्टि करें',
      cancel: 'रद्द करें',
      confirm: 'बुकिंग की पुष्टि करें',
      yourAppointments: 'आपके अपॉइंटमेंट',
      doctorAvailability: 'डॉक्टर की उपलब्धता',
      patientsSeen: 'आज देखे गए मरीज',
      totalCapacity: 'कुल क्षमता',
      timeSlot: 'समय स्लॉट',
      date: 'तारीख',
      status: 'स्थिति',
      booked: 'बुक',
      available: 'उपलब्ध'
    },
    ta: {
      title: 'நேரம் பதிவு',
      description: 'எங்கள் நிபுணர்களுடன் உங்கள் ஆலோசனைக்கான நேரத்தை திட்டமிடுங்கள்',
      availableSlots: 'கிடைக்கும் நேர இடங்கள்',
      selectSlot: 'உங்கள் ஆலோசனைக்கு ஒரு நேர இடத்தைத் தேர்ந்தெடுக்கவும்',
      specialist: 'நுரையீரல் நிபுணர்',
      confirmAppointment: 'நேரத்தை உறுதிப்படுத்தவும்',
      cancel: 'ரத்து செய்',
      confirm: 'பதிவை உறுதிப்படுத்தவும்',
      yourAppointments: 'உங்கள் நேரங்கள்',
      doctorAvailability: 'மருத்துவர் கிடைப்பு',
      patientsSeen: 'இன்று பார்த்த நோயாளிகள்',
      totalCapacity: 'மொத்த கொள்ளளவு',
      timeSlot: 'நேர இடம்',
      date: 'தேதி',
      status: 'நிலை',
      booked: 'பதிவு',
      available: 'கிடைக்கும்'
    }
  };

  const t = translations[state.language] || translations.en;

  const handleBookSlot = (slot) => {
    if (slot.available) {
      setSelectedSlot(slot);
      setShowConfirmation(true);
    }
  };

  const confirmBooking = () => {
    if (selectedSlot) {
      const appointment = {
        id: Date.now(),
        time: selectedSlot.time,
        specialist: t.specialist,
        date: new Date().toLocaleDateString(),
        slotId: selectedSlot.id,
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'BOOK_APPOINTMENT', payload: appointment });
      setShowConfirmation(false);
      setSelectedSlot(null);
    }
  };

  const isSlotBooked = (slotId) => {
    return state.appointments.some(apt => apt.slotId === slotId);
  };

  const getAvailabilityData = () => {
    const totalSlots = state.availableSlots.length;
    const bookedSlots = state.appointments.length;
    const availableSlots = totalSlots - bookedSlots;
    
    return {
      total: totalSlots,
      booked: bookedSlots,
      available: availableSlots,
      percentage: Math.round((bookedSlots / totalSlots) * 100)
    };
  };

  const availability = getAvailabilityData();

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
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-medical-green rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">{t.title}</CardTitle>
              <CardDescription className="text-lg">{t.description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Time Slots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{t.availableSlots}</span>
              </CardTitle>
              <CardDescription>{t.selectSlot}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.availableSlots.map((slot) => {
                  const isBooked = isSlotBooked(slot.id);
                  return (
                    <motion.button
                      key={slot.id}
                      onClick={() => handleBookSlot(slot)}
                      disabled={isBooked}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                        isBooked
                          ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-white border-medical-blue text-medical-blue hover:bg-blue-50 hover:border-blue-600 hover:shadow-md'
                      }`}
                      whileHover={!isBooked ? { scale: 1.02 } : {}}
                      whileTap={!isBooked ? { scale: 0.98 } : {}}
                    >
                      <div className="text-center">
                        <div className="text-xl font-semibold mb-2">{slot.time}</div>
                        <Badge 
                          variant={isBooked ? "secondary" : "default"}
                          className={isBooked ? "bg-gray-500" : "bg-green-500"}
                        >
                          {isBooked ? t.booked : t.available}
                        </Badge>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Booked Appointments */}
        <AnimatePresence>
          {state.appointments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{t.yourAppointments}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {state.appointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-green-800 text-lg">
                                {appointment.specialist}
                              </p>
                              <p className="text-green-600">
                                {appointment.time} • {appointment.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-green-600">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Doctor Availability */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>{t.doctorAvailability}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{t.patientsSeen}</span>
                  <span className="font-semibold text-lg">{availability.booked} / {availability.total}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${availability.percentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">{availability.percentage}% capacity used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available Slots</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {availability.available}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Booked Today</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {availability.booked}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Capacity</span>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {availability.total}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{t.confirmAppointment}</span>
            </DialogTitle>
            <DialogDescription>
              Please review your appointment details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSlot && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{t.specialist}:</span>
                    <span>{t.specialist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t.timeSlot}:</span>
                    <span>{selectedSlot.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">{t.date}:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={confirmBooking}
                  className="flex-1 bg-medical-green hover:bg-green-600"
                >
                  {t.confirm}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentBookingPage;
