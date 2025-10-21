# MediNova - Patient Dashboard (Demo Version)

A polished, professional Patient Dashboard prototype for healthcare hackathon demonstration. This is a **frontend-only demo** with all data mocked and simulated.

## 🏥 Demo Features

### Patient Dashboard
- **Patient Profile**: Complete patient information with photo, contact details, and recent symptoms
- **Chat Summary**: Recent AI chat analysis with specialist recommendations
- **Appointment Management**: Upcoming appointments with rescheduling functionality
- **Scan Reports**: Medical image analysis with confidence scores and urgency levels
- **Cost Savings Tracker**: Real-time savings calculation and progress tracking
- **Health Timeline**: Chronological view of patient health events
- **Audit Trail**: Complete consent and activity logging

### Interactive Features
- **Report Modal**: Detailed scan analysis with heatmap overlay toggle
- **Chat History**: Full conversation history with timestamps
- **Reschedule Appointments**: Interactive time slot selection
- **Doctor Feedback**: Thumbs up/down feedback system
- **PDF Generation**: Downloadable referral reports

## 🚀 Quick Start

### Option 1: React Development Server
```bash
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Static Demo
Open `public/demo.html` directly in your browser for a quick preview.

## 🎯 Demo Script

### What to Show
1. **Patient Profile**: Click on patient card to see complete information
2. **Chat Summary**: Click "View full chat" to see conversation history
3. **Appointment Booking**: Click "Reschedule" to see time slot selection
4. **Scan Reports**: Click "View Report" to see detailed analysis with heatmap
5. **Cost Savings**: Show animated savings counter and progress bar
6. **Health Timeline**: Scroll through recent health events
7. **PDF Download**: Click "Generate Referral PDF" to download sample report

### Key Interactions
- **Heatmap Toggle**: In scan report modal, toggle heatmap overlay
- **Feedback System**: Use thumbs up/down buttons in report modal
- **Rescheduling**: Select different time slots in appointment modal
- **Modal Navigation**: All modals have smooth animations and close buttons

## 🎨 Design Features

- **Medical Theme**: Clean blue/green color palette
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for professional feel
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Professional UI**: shadcn/ui components with medical styling

## 📁 Project Structure

```
src/
├── pages/
│   ├── Dashboard.js          # Main dashboard page
│   ├── SymptomChecker.js     # AI symptom analysis
│   ├── AppointmentBooking.js # Calendar and booking system
│   └── ScanAnalysis.js       # Image upload and analysis
├── components/
│   ├── PatientCard.js        # Patient profile component
│   ├── AppointmentCard.js    # Appointment management
│   ├── SavingsMeter.js       # Cost savings tracker
│   ├── AuditList.js          # Audit trail display
│   └── ReportModal.js        # Detailed scan report modal
├── data/
│   └── patientData.js        # Mock patient data
└── assets/                   # Static assets and images
```

## 🔧 Technical Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **shadcn/ui** - Professional UI components
- **Framer Motion** - Smooth animations
- **Lucide React** - Medical and interface icons
- **No Backend** - All data stored in browser state

## ⚠️ Demo Disclaimer

This is a **DEMO VERSION** with the following characteristics:
- All data is **mocked and simulated**
- No real AI analysis or medical diagnosis
- No backend integration or data persistence
- All interactions are **frontend-only**
- **Not for medical use** - for demonstration purposes only

## 🏆 Hackathon Presentation

### Key Points to Highlight
1. **Professional UI/UX** - Enterprise-grade design
2. **Complete Workflow** - End-to-end patient journey
3. **Interactive Features** - Realistic user interactions
4. **Cost Savings** - Quantified value proposition
5. **Scalability** - Modular component architecture
6. **Accessibility** - Inclusive design principles

### Demo Flow
1. Start with patient dashboard overview
2. Show chat analysis and recommendations
3. Demonstrate appointment booking/rescheduling
4. Display scan analysis with heatmap
5. Highlight cost savings and efficiency
6. Show audit trail and compliance features

---

**Note**: This demo showcases the complete vision of MediNova healthcare platform. All features are simulated for demonstration purposes.