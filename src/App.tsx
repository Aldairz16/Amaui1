import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Pill, HeartPulse, BookOpen, Menu, UserCircle, Users, Bell, LayoutDashboard } from 'lucide-react';
import { Splash } from './pages/Splash';
import { RoleSelection } from './pages/RoleSelection';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Medicinas } from './pages/Medicinas';
import { AddMedication } from './pages/AddMedication';
import { Salud } from './pages/Salud';
import { Aprender } from './pages/Aprender';
import { Caregiver } from './pages/Caregiver';
import { AppProvider, useAppContext } from './store/AppContext';
import { AuthProvider } from './store/AuthContext';
import { SegmentedControl } from './components/SegmentedControl';
import { VoiceAssistant } from './components/VoiceAssistant';

// --- Components ---

const BottomNav = () => {
  const { activeContext } = useAppContext();
  const location = useLocation();
  const currentPath = location.pathname;

  if (activeContext === 'self') {
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
  } else {
    // Caregiver Context
    return (
      <nav className="bottom-nav">
        <Link to="/caregiver" className={`nav-item ${currentPath.includes('/caregiver') ? 'active' : ''}`}>
          <LayoutDashboard size={28} />
          <span>Resumen</span>
        </Link>
        <Link to="/caregiver/personas" className={`nav-item ${currentPath.includes('/caregiver/personas') ? 'active' : ''}`}>
          <Users size={28} />
          <span>Personas</span>
        </Link>
        <Link to="/caregiver/alertas" className={`nav-item ${currentPath.includes('/caregiver/alertas') ? 'active' : ''}`}>
          <Bell size={28} />
          <span>Alertas</span>
        </Link>
        <Link to="/perfil" className={`nav-item ${currentPath.includes('/perfil') ? 'active' : ''}`}>
          <UserCircle size={28} />
          <span>Perfil</span>
        </Link>
      </nav>
    );
  }
};

// --- Eliminated Mock VoiceAssistantFAB in favor of components/VoiceAssistant.tsx ---

const TopBar = () => {
  const { role, activeContext, setActiveContext } = useAppContext();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 40 }}>
      {/* Drawer Menu Button */}
      <div className="flex justify-between items-center" style={{ marginBottom: role === 'mixed' ? '1rem' : 0 }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', margin: 0 }}>AMAUI</h1>
        <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Menú principal">
          <Menu size={28} color="var(--color-text-main)" />
        </button>
      </div>
      
      {/* Segmented Control only for mixed role */}
      {role === 'mixed' && (
        <SegmentedControl 
          activeValue={activeContext}
          onChange={(val: any) => {
            setActiveContext(val);
            if (val === 'self') navigate('/home');
            else navigate('/caregiver');
          }}
          options={[
            { label: 'Mi Salud', value: 'self' },
            { label: 'Personas que cuido', value: 'caregiver' }
          ]}
        />
      )}
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-main)', position: 'relative', overflowX: 'hidden' }}>
      <TopBar />
      <div className="page-container" style={{ paddingTop: '1rem', flex: 1 }}>
        {children}
      </div>
      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

// --- Mock Pages para Caregiver (hasta Fase 3) ---
const PersonasDemo = () => <div><h1>Personas que cuido</h1><p>Lista en construcción</p></div>;
const AlertasDemo = () => <div><h1>Alertas</h1><p>Lista en construcción</p></div>;
const PerfilDemo = () => <div><h1>Mi Perfil / Configuración</h1><p>En construcción</p></div>;

// --- App ---

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Flow */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/roles" element={<RoleSelection />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Main Tab Routes (Self) */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/medicinas" element={<Layout><Medicinas /></Layout>} />
        <Route path="/add-medication" element={<Layout><AddMedication /></Layout>} />
        <Route path="/salud" element={<Layout><Salud /></Layout>} />
        <Route path="/aprender" element={<Layout><Aprender /></Layout>} />

        {/* Main Tab Routes (Caregiver) */}
        <Route path="/caregiver" element={<Layout><Caregiver /></Layout>} />
        <Route path="/caregiver/personas" element={<Layout><PersonasDemo /></Layout>} />
        <Route path="/caregiver/alertas" element={<Layout><AlertasDemo /></Layout>} />
        <Route path="/perfil" element={<Layout><PerfilDemo /></Layout>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
