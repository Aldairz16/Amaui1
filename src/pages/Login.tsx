import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/UI';
import { Volume2, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handlePhoneSubmit = () => {
    if (phone.length >= 9) {
      setError('');
      setStep('otp');
    } else {
      setError('Por favor, ingresa un número válido.');
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setError('');
      // Simulate success and navigate to role selection
      navigate('/roles');
    } else {
      setError('El código debe tener 4 números.');
    }
  };

  return (
    <div className="page-container" style={{ justifyContent: 'center', minHeight: '100vh', paddingBottom: '2rem' }}>
      
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
          {step === 'phone' ? 'Ingresa' : 'Confirma'}
        </h1>
        <button 
          className="btn-ghost" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '16px', backgroundColor: 'var(--color-surface)' }}
          onClick={() => {
            // Mock read out loud
            alert("Opción leída en voz alta activada.");
          }}
        >
          <Volume2 size={24} color="var(--color-primary)" />
          <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Leer</span>
        </button>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {step === 'phone' ? (
          <>
            <p className="text-xl" style={{ marginBottom: '2rem' }}>
              Escribe tu número de celular para empezar.
            </p>
            <Input 
              label="Mi número es:" 
              type="tel" 
              placeholder="Ej. 987654321" 
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={9}
              inputMode="numeric"
            />
            {error && (
              <div style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold' }}>
                {error}
              </div>
            )}
            <Button 
              onClick={handlePhoneSubmit} 
              disabled={phone.length < 9}
              style={{ marginTop: '1rem' }}
            >
              Continuar
            </Button>
          </>
        ) : (
          <>
            <p className="text-xl" style={{ marginBottom: '2rem' }}>
              Te enviamos un mensaje con 4 números. Escríbelos aquí:
            </p>
            <Input 
              label="El código es:" 
              type="tel" 
              placeholder="Ej. 1234" 
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={4}
              inputMode="numeric"
            />
            {error && (
              <div style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold' }}>
                {error}
              </div>
            )}
            <Button 
              onClick={handleOtpSubmit} 
              disabled={otp.length < 4}
              style={{ marginTop: '1rem' }}
            >
              Entrar
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setStep('phone')} 
              style={{ marginTop: '1rem' }}
            >
              Cambiar número
            </Button>
          </>
        )}
      </div>

      {/* Demo Quick Access */}
      <div style={{ marginTop: '3rem', borderTop: '2px dashed var(--color-border)', paddingTop: '2rem' }}>
        <p className="text-center text-muted text-lg" style={{ marginBottom: '1rem' }}>
          <Zap size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Acceso Rápido (Solo Demo)
        </p>
        <div className="flex-col gap-sm">
          <Button variant="outline" onClick={() => navigate('/roles')} style={{ fontSize: '1rem', padding: '0.75rem' }}>
            Saltar al inicio (Sin código)
          </Button>
          <Button variant="ghost" onClick={() => navigate('/home')} style={{ fontSize: '1rem', padding: '0.75rem' }}>
            Ir directo a Mi Salud (Usuario)
          </Button>
          <Button variant="ghost" onClick={() => navigate('/caregiver')} style={{ fontSize: '1rem', padding: '0.75rem' }}>
            Ir directo a Cuidador
          </Button>
        </div>
      </div>

    </div>
  );
};
