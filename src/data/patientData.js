// Mock patient data for MediNova demo
export const patientData = {
  name: "Asha Gupta",
  age: 42,
  contact: "+91 98XXXXXXX",
  email: "asha.gupta@email.com",
  recentVisitDate: "2025-09-15",
  recentSymptoms: ["Chest pain", "Cough", "Fever"],
  appointments: [
    { 
      id: 1, 
      doctor: "Dr. R. Mehta", 
      specialty: "Pulmonology", 
      datetime: "2025-09-20 11:00", 
      clinic: "CityCare Hospital",
      status: "upcoming"
    },
    {
      id: 2,
      doctor: "Dr. S. Patel",
      specialty: "Cardiology", 
      datetime: "2025-09-18 14:30",
      clinic: "CityCare Hospital",
      status: "completed"
    }
  ],
  scans: [
    { 
      id: 1, 
      filename: "xray.png", 
      condition: "Pneumonia", 
      confidence: 92, 
      urgency: "High", 
      heatmap: "heatmap.png", 
      date: "2025-09-19",
      insights: "Suspicious patch detected in left lung",
      suggestedAction: "Consult Pulmonologist immediately"
    },
    {
      id: 2,
      filename: "ct-scan.png",
      condition: "Normal",
      confidence: 88,
      urgency: "Low",
      heatmap: "heatmap-2.png",
      date: "2025-09-15",
      insights: "No abnormalities detected",
      suggestedAction: "Continue regular monitoring"
    }
  ],
  chatHistory: [
    {
      id: 1,
      timestamp: "2025-09-19 10:30",
      user: "Patient",
      message: "I've been experiencing chest pain and persistent cough for 3 days"
    },
    {
      id: 2,
      timestamp: "2025-09-19 10:31",
      user: "AI Assistant",
      message: "I understand you're experiencing chest pain and cough. These symptoms can have various causes. Can you describe the intensity of the pain on a scale of 1-10?"
    },
    {
      id: 3,
      timestamp: "2025-09-19 10:32",
      user: "Patient",
      message: "The pain is about 6/10, mostly when I take deep breaths"
    },
    {
      id: 4,
      timestamp: "2025-09-19 10:33",
      user: "AI Assistant",
      message: "Based on your symptoms, I recommend consulting a Pulmonologist. The combination of chest pain with breathing and persistent cough warrants medical evaluation. I've identified this as Medium severity."
    }
  ],
  audit: [
    { id: 1, event: "Consent given", timestamp: "2025-09-19 10:12" },
    { id: 2, event: "Scan uploaded (DEMO)", timestamp: "2025-09-19 10:15" },
    { id: 3, event: "Report generated (DEMO)", timestamp: "2025-09-19 10:18" },
    { id: 4, event: "Appointment booked", timestamp: "2025-09-19 10:25" },
    { id: 5, event: "Chat session completed", timestamp: "2025-09-19 10:35" },
    { id: 6, event: "Referral downloaded", timestamp: "2025-09-19 10:40" }
  ],
  urgencyScore: "Medium",
  healthTimeline: [
    { id: 1, event: "Symptom entered", timestamp: "2025-09-19 10:30", type: "symptom" },
    { id: 2, event: "Appointment booked", timestamp: "2025-09-19 10:25", type: "appointment" },
    { id: 3, event: "Scan uploaded", timestamp: "2025-09-19 10:15", type: "scan" },
    { id: 4, event: "Report generated", timestamp: "2025-09-19 10:18", type: "report" },
    { id: 5, event: "Referral generated", timestamp: "2025-09-19 10:40", type: "referral" },
    { id: 6, event: "Follow-up scheduled", timestamp: "2025-09-20 11:00", type: "appointment" }
  ]
};
