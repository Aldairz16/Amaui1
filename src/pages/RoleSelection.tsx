import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, setActiveContext } = useAppContext();

  const handleSelect = (r: 'user' | 'caregiver' | 'mixed') => {
    setRole(r);
    setActiveContext(r === 'caregiver' ? 'caregiver' : 'self');
    navigate(r === 'caregiver' ? '/caregiver' : '/onboarding');
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        paddingTop: '3rem'
      }}
    >
      {/* Back */}
      <button 
        onClick={() => navigate(-1)}
        style={{ 
          background: 'transparent', 
          border: 'none', 
          fontSize: '1.1rem', 
          color: '#2F3A3D', 
          cursor: 'pointer', 
          padding: 0, 
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ← Atrás
      </button>

      {/* Title */}
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#2F3A3D', margin: 0, marginBottom: '2rem', lineHeight: 1.2 }}>
        ¿Cómo quieres iniciar?
      </h1>

      {/* Cards Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Adulto Mayor Card */}
        <button 
          onClick={() => handleSelect('user')}
          style={{ 
            width: '100%',
            backgroundColor: '#E8C99B',
            border: 'none',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={32} color="#6B5A3E" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#2F3A3D' }}>Adulto Mayor</h2>
            <p style={{ margin: 0, marginTop: '0.25rem', fontSize: '1rem', color: '#5C5347' }}>Quiero gestionar mi día</p>
          </div>
        </button>

        {/* Cuidador Card */}
        <button 
          onClick={() => handleSelect('caregiver')}
          style={{ 
            width: '100%',
            backgroundColor: '#E8C99B',
            border: 'none',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={32} color="#6B5A3E" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#2F3A3D' }}>Cuidador</h2>
            <p style={{ margin: 0, marginTop: '0.25rem', fontSize: '1rem', color: '#5C5347' }}>Asistir a un familiar</p>
          </div>
        </button>

      </div>
    </div>
  );
};
