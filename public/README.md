# MediNova - Healthcare AI Prototype

## 🏥 About
MediNova is an AI-powered healthcare diagnosis platform designed for hackathon demonstration. This prototype showcases end-to-end patient care flow with mock data and realistic UI/UX.

## 🚀 Features

### 1. Chat Page (Symptom Checker)
- Interactive symptom input
- AI-powered analysis with mock responses
- Specialist recommendations
- Severity assessment
- Chat history storage

### 2. Appointment Page (Scheduler)
- Time slot selection (10:00 AM - 2:00 PM)
- Real-time booking confirmation
- Appointment history
- Specialist assignment

### 3. Upload Page (Image Diagnosis)
- File upload for medical images
- AI analysis simulation
- Confidence scoring
- Heatmap visualization toggle
- Upload history tracking

### 4. Dashboard Page (Unified View)
- Comprehensive patient overview
- Urgency assessment
- Cost savings tracking
- Referral report generation
- PDF export functionality

## 🎯 Demo Flow

1. **Enter Symptoms**: "I have cough and chest pain"
2. **Get Analysis**: AI suggests Pulmonology specialist, Medium severity
3. **Book Appointment**: Select 11:00 AM slot
4. **Upload Image**: Upload sample X-ray for analysis
5. **View Results**: See Pneumonia diagnosis with 92% confidence
6. **Generate Report**: Create comprehensive referral PDF

## 🛠️ Technical Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Emoji-based (for quick prototyping)
- **PDF Generation**: Mock implementation

## 📱 Mobile Responsive

The application is fully responsive and optimized for mobile devices, perfect for hackathon demonstrations.

## 🔮 Future Integration Plan

- Replace mock chatbot with Gemini API
- Integrate YOVO local model for real image analysis
- Add SQLite database for persistence
- Implement real-time audit logging
- Enable offline-first functionality

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 Hackathon Notes

This prototype is designed for a 2-hour hackathon with the following priorities:
- ✅ Professional UI/UX
- ✅ End-to-end user flow
- ✅ Mock data integration
- ✅ Mobile responsiveness
- ✅ Demo-ready features

Perfect for impressing judges with a complete healthcare AI solution!
