import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOTAL_STEPS = 7;

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form Data
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mainCondition, setMainCondition] = useState('');
  const [otherCondition, setOtherCondition] = useState('');
  const [history, setHistory] = useState('');
  const [trustedName, setTrustedName] = useState('');
  const [trustedPhone, setTrustedPhone] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 1: return name.trim().length > 0;
      case 2: return age.trim().length > 0;
      case 3: return mainCondition.trim().length > 0;
      case 4: return true; // Optional
      case 5: return true; // Optional
      case 6: return trustedName.trim().length > 0;
      case 7: return trustedPhone.trim().length >= 9;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  // Render step content
  const renderStep = () => {
    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: '1rem',
      fontSize: '1.1rem',
      border: '2px solid #E0C9A8',
      borderRadius: '16px',
      outline: 'none',
      backgroundColor: '#FFF',
      boxSizing: 'border-box'
    };

    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 style={titleStyle}>¿Cómo te llamas?</h1>
            <input style={inputStyle} type="text" placeholder="Escribe tu nombre" value={name} onChange={e => setName(e.target.value)} />
          </>
        );
      case 2:
        return (
          <>
            <h1 style={titleStyle}>¿Cuántos años tienes?</h1>
            <input style={inputStyle} type="tel" inputMode="numeric" placeholder="Ej. 65" value={age} onChange={e => setAge(e.target.value.replace(/[^0-9]/g, ''))} maxLength={3} />
          </>
        );
      case 3:
        return (
          <>
            <h1 style={titleStyle}>¿Qué condición de salud principal tienes?</h1>
            <input style={inputStyle} type="text" placeholder="Ej. Hipertensión, Diabetes" value={mainCondition} onChange={e => setMainCondition(e.target.value)} />
          </>
        );
      case 4:
        return (
          <>
            <h1 style={titleStyle}>¿Tienes otra enfermedad?</h1>
            <p style={subtitleStyle}>Es opcional, pero nos ayuda a cuidarte mejor.</p>
            <input style={inputStyle} type="text" placeholder="Ej. Colesterol alto" value={otherCondition} onChange={e => setOtherCondition(e.target.value)} />
          </>
        );
      case 5:
        return (
          <>
            <h1 style={titleStyle}>¿Algo más que debamos saber?</h1>
            <p style={subtitleStyle}>Puedes contarnos brevemente si tomas algún tratamiento especial.</p>
            <textarea
              placeholder="Escribe aquí (opcional)"
              value={history}
              onChange={e => setHistory(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
          </>
        );
      case 6:
        return (
          <>
            <h1 style={titleStyle}>¿Quién es tu persona de confianza?</h1>
            <p style={subtitleStyle}>Si alguna vez necesitas ayuda, podemos contactarla por ti.</p>
            <input style={inputStyle} type="text" placeholder="Nombre de tu persona de confianza" value={trustedName} onChange={e => setTrustedName(e.target.value)} />
          </>
        );
      case 7:
        return (
          <>
            <h1 style={titleStyle}>¿Cuál es su número de celular?</h1>
            <p style={subtitleStyle}>Solo lo usaremos en caso de emergencia o para enviarle un aviso.</p>
            <input style={inputStyle} type="tel" inputMode="numeric" placeholder="Ej. 987654321" value={trustedPhone} onChange={e => setTrustedPhone(e.target.value.replace(/[^0-9]/g, ''))} maxLength={9} />
          </>
        );
      default:
        return null;
    }
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
        onClick={handleBack}
        style={{ 
          background: 'transparent', 
          border: 'none', 
          fontSize: '1.1rem', 
          color: '#2F3A3D', 
          cursor: 'pointer', 
          padding: 0, 
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        ← Atrás
      </button>

      {/* Spacer to push content down */}
      <div style={{ flex: 1 }} />

      {/* Progress Bar */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '0.5rem' }}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              backgroundColor: i < currentStep ? '#C47A3A' : '#E8D5BF'
            }}
          />
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: '#8B8B8B', margin: 0, marginBottom: '2rem' }}>
        Paso {currentStep} de {TOTAL_STEPS}
      </p>

      {/* Step Content */}
      <div style={{ marginBottom: '2rem' }}>
        {renderStep()}
      </div>

      {/* Next Button */}
      <button 
        onClick={handleNext}
        disabled={!canProceed()}
        style={{
          width: '100%',
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#FFFFFF',
          backgroundColor: canProceed() ? '#D9C0A0' : '#E8DDD0',
          border: 'none',
          borderRadius: '9999px',
          cursor: canProceed() ? 'pointer' : 'default',
          marginBottom: '2rem'
        }}
      >
        Siguiente
      </button>

      {/* Bottom Spacer */}
      <div style={{ flex: 1 }} />
    </div>
  );
};

// --- Shared Styles ---
const titleStyle: React.CSSProperties = {
  fontSize: '1.75rem',
  fontWeight: 800,
  color: '#2F3A3D',
  margin: 0,
  marginBottom: '1.5rem',
  lineHeight: 1.3
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: '#8B8B8B',
  margin: 0,
  marginBottom: '1.5rem',
  lineHeight: 1.4
};
