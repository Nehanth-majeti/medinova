# MediNova Setup Guide

## 🚨 Prerequisites

### 1. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version (18.x or higher)
- Install with default settings
- Restart your terminal/command prompt after installation

### 2. Verify Installation
```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open Browser
- Navigate to: http://localhost:3000
- The app should load automatically

## 📱 Demo Instructions

### Step 1: Chat Analysis
1. Go to Chat tab
2. Enter: "I have cough and chest pain"
3. Click "Analyze Symptoms"
4. See: Pulmonology specialist, Medium severity

### Step 2: Book Appointment
1. Go to Book tab
2. Click 11:00 AM slot
3. Confirm booking
4. See: "Appointment booked with Pulmonologist"

### Step 3: Upload Image
1. Go to Upload tab
2. Click "Choose File" (upload any image)
3. See: Pneumonia 92% confidence
4. Toggle heatmap overlay

### Step 4: Dashboard
1. Go to Dashboard tab
2. See: All collected data
3. Click "Generate Referral Report"
4. See: PDF preview modal

## 🛠️ Troubleshooting

### Issue: 'node' is not recognized
**Solution**: Install Node.js from https://nodejs.org/

### Issue: 'npm' is not recognized
**Solution**: Node.js installation includes npm. Restart terminal after installing Node.js.

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
npm start -- --port 3001
```

### Issue: Module not found errors
**Solution**: 
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project Structure
```
MediNova(ProtoType)/
├── public/
│   ├── index.html
│   └── README.md
├── src/
│   ├── components/
│   │   ├── ChatPage.js
│   │   ├── AppointmentPage.js
│   │   ├── UploadPage.js
│   │   ├── DashboardPage.js
│   │   └── Layout.js
│   ├── context/
│   │   └── AppContext.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Features Implemented

✅ **Chat Page**: AI symptom checker with mock responses
✅ **Appointment Page**: Time slot booking system
✅ **Upload Page**: Image upload with mock AI analysis
✅ **Dashboard Page**: Unified view with referral report
✅ **Mobile Responsive**: Works on all screen sizes
✅ **State Management**: React Context for data persistence
✅ **Professional UI**: Medical theme with Tailwind CSS

## 🚀 Ready for Demo!

The application is fully functional and ready for your hackathon presentation!
