import React, { useState } from 'react';
import { Button } from '../components/UI';
import { Lock, Unlock, PlayCircle, MessageCircle, AlertTriangle } from 'lucide-react';

export const Aprender: React.FC = () => {
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const startSimulation = () => {
    setSimulating(true);
    setSimStep(1);
  };

  if (simulating) {
    return (
      <div className="flex-col" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
            Práctica Segura
          </h1>
          <p className="text-xl text-muted">Aprenderemos a enviar un mensaje</p>
        </div>

        {simStep === 1 && (
          <div className="card flex-col gap-md">
            <h2 style={{ fontSize: '1.75rem' }}>Paso 1: Escribir</h2>
            <p className="text-lg">Toca la caja blanca de abajo para escribir un mensaje de saludo a tu nieto.</p>
            
            <div 
              style={{ backgroundColor: '#ECE5DD', padding: '1rem', borderRadius: '16px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <div className="flex gap-sm">
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje" 
                  style={{ flex: 1, padding: '1rem', borderRadius: '24px', border: 'none', fontSize: '1.2rem' }} 
                  readOnly
                  onClick={() => setSimStep(2)}
                />
              </div>
            </div>
            <Button variant="ghost" onClick={() => setSimulating(false)}>Salir de la práctica</Button>
          </div>
        )}

        {simStep === 2 && (
          <div className="card flex-col gap-md">
            <h2 style={{ fontSize: '1.75rem' }}>Paso 2: Enviar</h2>
            <p className="text-lg">¡Muy bien! Ahora toca el botón verde con el avión de papel para enviarlo.</p>
            
            <div 
              style={{ backgroundColor: '#ECE5DD', padding: '1rem', borderRadius: '16px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <div className="flex gap-sm">
                <input 
                  type="text" 
                  value="Hola nieto, ¿cómo estás?" 
                  readOnly
                  style={{ flex: 1, padding: '1rem', borderRadius: '24px', border: 'none', fontSize: '1.2rem' }} 
                />
                <button 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#25D366', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setSimStep(3)}
                >
                  <PlayCircle size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {simStep === 3 && (
          <div className="card flex-col items-center text-center gap-md">
            <MessageCircle size={64} color="var(--color-primary)" />
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>¡Sí puedo!</h2>
            <p className="text-xl text-muted">Has enviado tu primer mensaje correctamente. Estás avanzando muy bien.</p>
            <Button onClick={() => setSimulating(false)}>
              Volver a Aprender
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
          Aprender
        </h1>
        <p className="text-xl text-muted" style={{ marginTop: '0.5rem' }}>
          Cada vez que usas AMAUI, desbloqueas lecciones para usar mejor tu celular.
        </p>
      </div>

      <div className="flex-col gap-md">
        
        {/* Nivel 1 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Nivel 1: Primeros Pasos</h2>
          <div 
            className="card flex items-center justify-between" 
            style={{ backgroundColor: 'var(--color-surface)', cursor: 'pointer', borderLeft: '6px solid var(--color-primary)' }}
            onClick={startSimulation}
          >
            <div className="flex items-center gap-md">
              <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
                <MessageCircle size={32} color="var(--color-primary)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary)' }}>Enviar un mensaje</h3>
                <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Práctica guiada (WhatsApp)</p>
              </div>
            </div>
            <Unlock size={24} color="var(--color-primary)" />
          </div>
        </div>

        {/* Nivel 2 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Nivel 2: Comunicación Diaria</h2>
          <div className="card flex items-center justify-between" style={{ opacity: 0.6 }}>
            <div className="flex items-center gap-md">
              <div style={{ backgroundColor: 'var(--color-border)', padding: '1rem', borderRadius: '50%' }}>
                <PlayCircle size={32} color="var(--color-text-muted)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>Hacer videollamadas</h3>
                <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Usa AMAUI 3 días para desbloquear</p>
              </div>
            </div>
            <Lock size={24} color="var(--color-text-muted)" />
          </div>
        </div>

        {/* Nivel 3 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Nivel 3: Seguridad</h2>
          <div className="card flex items-center justify-between" style={{ opacity: 0.6 }}>
            <div className="flex items-center gap-md">
              <div style={{ backgroundColor: 'var(--color-border)', padding: '1rem', borderRadius: '50%' }}>
                <AlertTriangle size={32} color="var(--color-text-muted)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>Detectar estafas</h3>
                <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Usa AMAUI 7 días para desbloquear</p>
              </div>
            </div>
            <Lock size={24} color="var(--color-text-muted)" />
          </div>
        </div>

      </div>
    </>
  );
};
