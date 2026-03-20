import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Mic, MicOff, Home as HomeIcon, Pill, HeartPulse, BookOpen } from 'lucide-react';
import { Splash } from './pages/Splash';
import { Login } from './pages/Login';
import { RoleSelection } from './pages/RoleSelection';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Medicinas } from './pages/Medicinas';
import { AddMedication } from './pages/AddMedication';
import { Salud } from './pages/Salud';
import { Aprender } from './pages/Aprender';
import { Caregiver } from './pages/Caregiver';

// --- Components ---

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={`nav-item ${currentPath.includes('/home') ? 'active' : ''}`}>
        <HomeIcon size={28} />
        <span>Inicio</span>
      </Link>
      <Link to="/medicinas" className={`nav-item ${currentPath.includes('/medicinas') ? 'active' : ''}`}>
        <Pill size={28} />
        <span>Medicinas</span>
      </Link>
      <Link to="/salud" className={`nav-item ${currentPath.includes('/salud') ? 'active' : ''}`}>
        <HeartPulse size={28} />
        <span>Salud</span>
      </Link>
      <Link to="/aprender" className={`nav-item ${currentPath.includes('/aprender') ? 'active' : ''}`}>
        <BookOpen size={28} />
        <span>Aprender</span>
      </Link>
    </nav>
  );
};

const VoiceAssistantFAB = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <button 
      className={`fab-voice ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(!isActive)}
      aria-label="Asistente de voz"
    >
      {isActive ? <Mic size={32} /> : <MicOff size={32} />}
    </button>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-container">
      {children}
      <VoiceAssistantFAB />
      <BottomNav />
    </div>
  );
};

// --- Mock Pages ---

// --- App ---

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Flow */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/caregiver" element={<Caregiver />} />
        
        {/* Main Tab Routes */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/medicinas" element={<Layout><Medicinas /></Layout>} />
        <Route path="/add-medication" element={<Layout><AddMedication /></Layout>} />
        <Route path="/salud" element={<Layout><Salud /></Layout>} />
        <Route path="/aprender" element={<Layout><Aprender /></Layout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
