import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'welcome' | 'login'>('welcome');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // --- Supabase: Send OTP to email ---
  const handleEmailSubmit = async () => {
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, ingresa un correo válido.');
      return;
    }

    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
    });

    setLoading(false);

    if (error) {
      setError('No pudimos enviar el código. Intenta de nuevo.');
      console.error('Supabase OTP Error:', error.message);
    } else {
      setSuccessMsg('¡Te enviamos un código a tu correo!');
      setOtpStep(true);
    }
  };

  // --- Supabase: Verify OTP code ---
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      setError('El código debe tener 6 números.');
      return;
    }

    setError('');
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp,
      type: 'email',
    });

    setLoading(false);

    if (error) {
      setError('Código incorrecto o expirado. Intenta de nuevo.');
      console.error('Supabase Verify Error:', error.message);
    } else {
      // Auth successful! Navigate to role selection.
      navigate('/roles');
    }
  };

  // --- Welcome View ---
  if (view === 'welcome') {
    return (
      <div 
        style={{ 
          minHeight: '100vh', 
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <img 
          src="/amaui-logo.png" 
          alt="AMAUI - Oso con lentes y bufanda" 
          style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '2rem' }} 
        />

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#2F3A3D', margin: 0, lineHeight: 1.2 }}>
          Bienvenido a AMAUI
        </h1>

        <p style={{ fontSize: '1.1rem', color: '#8B8B8B', marginTop: '0.75rem', marginBottom: '3rem', maxWidth: '320px', lineHeight: 1.5 }}>
          Cuidamos de ti y de los que más quieres de forma sencilla
        </p>

        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => setView('login')}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 700,
              color: '#FFFFFF', backgroundColor: '#D4955A',
              border: 'none', borderRadius: '9999px', cursor: 'pointer'
            }}
          >
            Iniciar Sesión
          </button>

          <button 
            onClick={() => setView('login')}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 700,
              color: '#D4955A', backgroundColor: 'transparent',
              border: '2px solid #D4955A', borderRadius: '9999px', cursor: 'pointer'
            }}
          >
            Registro
          </button>
        </div>
      </div>
    );
  }

  // --- Login View (Email + OTP with Supabase) ---
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
        onClick={() => { otpStep ? setOtpStep(false) : setView('welcome'); setError(''); setSuccessMsg(''); }}
        style={{ background: 'transparent', border: 'none', fontSize: '1.1rem', color: '#2F3A3D', cursor: 'pointer', padding: 0, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        ← Atrás
      </button>

      {/* Small Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <img src="/amaui-logo.png" alt="AMAUI" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
      </div>

      {!otpStep ? (
        <>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2F3A3D', margin: 0, marginBottom: '0.5rem' }}>
            Ingresa tu correo
          </h1>
          <p style={{ fontSize: '1rem', color: '#8B8B8B', margin: 0, marginBottom: '2rem' }}>
            Te enviaremos un código de verificación
          </p>

          <label style={{ fontSize: '1rem', fontWeight: 600, color: '#2F3A3D', marginBottom: '0.5rem', display: 'block' }}>
            Mi correo es:
          </label>
          <input 
            type="email"
            placeholder="Ej. juan@correo.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.1rem',
              border: '2px solid #E0C9A8', borderRadius: '16px',
              outline: 'none', backgroundColor: '#FFF', marginBottom: '1rem', boxSizing: 'border-box'
            }}
          />

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.95rem' }}>
              {error}
            </div>
          )}

          <button 
            onClick={handleEmailSubmit}
            disabled={!email.includes('@') || loading}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: (!email.includes('@') || loading) ? '#D9C9B5' : '#D4955A',
              border: 'none', borderRadius: '9999px',
              cursor: (!email.includes('@') || loading) ? 'default' : 'pointer', marginTop: '1rem'
            }}
          >
            {loading ? 'Enviando...' : 'Siguiente'}
          </button>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#2F3A3D', margin: 0, marginBottom: '0.5rem' }}>
            Confirma tu código
          </h1>

          {successMsg && (
            <div style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.95rem' }}>
              {successMsg}
            </div>
          )}

          <p style={{ fontSize: '1rem', color: '#8B8B8B', margin: 0, marginBottom: '2rem' }}>
            Revisa tu correo <strong style={{ color: '#2F3A3D' }}>{email}</strong> y escribe el código de 6 números
          </p>

          <label style={{ fontSize: '1rem', fontWeight: 600, color: '#2F3A3D', marginBottom: '0.5rem', display: 'block' }}>
            El código es:
          </label>
          <input 
            type="tel"
            placeholder="Ej. 123456"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={6}
            inputMode="numeric"
            disabled={loading}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.5rem', letterSpacing: '0.5rem',
              textAlign: 'center', border: '2px solid #E0C9A8', borderRadius: '16px',
              outline: 'none', backgroundColor: '#FFF', marginBottom: '1rem', boxSizing: 'border-box'
            }}
          />

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.95rem' }}>
              {error}
            </div>
          )}

          <button 
            onClick={handleOtpSubmit}
            disabled={otp.length < 6 || loading}
            style={{
              width: '100%', padding: '1rem', fontSize: '1.2rem', fontWeight: 700,
              color: '#FFFFFF',
              backgroundColor: (otp.length < 6 || loading) ? '#D9C9B5' : '#D4955A',
              border: 'none', borderRadius: '9999px',
              cursor: (otp.length < 6 || loading) ? 'default' : 'pointer', marginTop: '1rem'
            }}
          >
            {loading ? 'Verificando...' : 'Entrar'}
          </button>

          <button 
            onClick={handleEmailSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '0.75rem', fontSize: '1rem', fontWeight: 600,
              color: '#D4955A', backgroundColor: 'transparent',
              border: 'none', cursor: 'pointer', marginTop: '1rem'
            }}
          >
            Reenviar código
          </button>
        </>
      )}

      {/* Demo Quick Access */}
      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '2px dashed #E5E5E5', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#B0B0B0', marginBottom: '0.75rem' }}>
          ⚡ Acceso Rápido (Solo Demo)
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => navigate('/roles')}
            style={{ background: 'transparent', border: '1px solid #E0C9A8', borderRadius: '12px', padding: '0.75rem', fontSize: '0.95rem', color: '#D4955A', fontWeight: 600, cursor: 'pointer' }}
          >
            Saltar al inicio (Sin código)
          </button>
          <button 
            onClick={() => navigate('/home')}
            style={{ background: 'transparent', border: 'none', padding: '0.5rem', fontSize: '0.9rem', color: '#B0B0B0', cursor: 'pointer' }}
          >
            Ir directo a Mi Salud
          </button>
        </div>
      </div>
    </div>
  );
};
