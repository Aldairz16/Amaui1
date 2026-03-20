import { useState } from 'react';
import { Mic, MicOff, Volume2, HelpCircle, Repeat, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay Backdrop - Blur Effect when Voice is Active */}
      {isActive && (
        <div 
          onClick={() => setIsActive(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(247, 244, 237, 0.9)',
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '2rem',
            paddingTop: '6rem'
          }}
        >
          <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', textAlign: 'center' }}>
            ¿En qué te ayudo?
          </h2>
          <p className="text-lg text-muted text-center" style={{ marginBottom: '2rem' }}>
            Di algo como:
          </p>

          <div className="flex-col gap-md">
            <button className="card flex items-center gap-sm" style={{ border: 'none', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} onClick={() => setIsActive(false)}>
              <Volume2 size={28} color="var(--color-secondary)" />
              <span className="text-bold text-lg" style={{ color: 'var(--color-text-main)' }}>"Léeme esta pantalla"</span>
            </button>

            <button className="card flex items-center gap-sm" style={{ border: 'none', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} onClick={() => setIsActive(false)}>
              <HelpCircle size={28} color="var(--color-alert-mod)" />
              <span className="text-bold text-lg" style={{ color: 'var(--color-text-main)' }}>"¿Qué me toca ahora?"</span>
            </button>

            <button className="card flex items-center gap-sm" style={{ border: 'none', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} onClick={() => setIsActive(false)}>
              <Repeat size={28} color="var(--color-primary)" />
              <span className="text-bold text-lg" style={{ color: 'var(--color-text-main)' }}>"Repite por favor"</span>
            </button>
            
            <button 
              className="card flex items-center gap-sm" 
              style={{ border: 'none', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} 
              onClick={() => {
                navigate('/aprender');
                setIsActive(false);
              }}
            >
              <ArrowRight size={28} color="var(--color-text-main)" />
              <span className="text-bold text-lg" style={{ color: 'var(--color-text-main)' }}>"Llévame a aprender"</span>
            </button>
          </div>
          
          <div style={{ flex: 1 }} />
          <p className="text-center text-primary text-bold" style={{ marginBottom: '6rem' }}>
            Escuchando...
          </p>
        </div>
      )}

      {/* Persistent Floating Button */}
      <button 
        className={`fab-voice ${isActive ? 'active' : ''}`}
        onClick={() => setIsActive(!isActive)}
        aria-label={isActive ? "Detener asistente" : "Hablar con AMAUI"}
        style={{ zIndex: 50 }}
      >
        {isActive ? <Mic size={32} /> : <MicOff size={32} />}
      </button>
    </>
  );
};
