import React, { useState } from 'react';
import { Button } from '../components/UI';
import { CheckCircle, Heart, BookOpen, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // Mock state for demo
  const [tookMed, setTookMed] = useState(false);

  return (
    <>
      {/* Header section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
          Hola, María
        </h1>
        <p className="text-xl text-muted" style={{ marginTop: '0.5rem' }}>
          Jueves, 20 de Marzo
        </p>
      </div>

      {/* Hero / Next Medicine Widget */}
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Siguiente Medicina</h2>
      <div 
        className="card flex-col items-center" 
        style={{ 
          backgroundColor: tookMed ? 'var(--color-bg-main)' : 'var(--color-surface)',
          border: tookMed ? '2px solid var(--color-primary)' : 'none'
        }}
      >
        {tookMed ? (
          <div className="flex-col items-center text-center gap-sm">
            <CheckCircle size={64} color="var(--color-primary)" />
            <h2 style={{ color: 'var(--color-primary)', margin: 0 }}>¡Listo, bien hecho!</h2>
            <p className="text-lg">Tómate un descanso, regresamos a la siguiente hora.</p>
          </div>
        ) : (
          <div className="flex-col items-center text-center w-full">
            <div className="badge badge-alert" style={{ marginBottom: '1rem' }}>
              En 10 minutos
            </div>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>Losartán 50mg</h2>
            <p className="text-lg text-muted">Para la presión</p>
            
            <div className="flex-col gap-sm w-full" style={{ marginTop: '1.5rem' }}>
              <Button onClick={() => setTookMed(true)}>
                Sí, ya la tomé
              </Button>
              <Button variant="outline">
                Recordar en 15 min
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Grid */}
      <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Acciones Rápidas</h2>
      <div className="flex-col gap-md">
        
        <button 
          className="card flex items-center gap-md"
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', margin: 0 }}
          onClick={() => navigate('/salud')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '0.75rem', borderRadius: '50%' }}>
            <Heart size={32} color="var(--color-alert-mod)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Registrar presión</h3>
            <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Hoy aún no lo has hecho</p>
          </div>
        </button>

        <button 
          className="card flex items-center gap-md"
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', margin: 0 }}
          onClick={() => navigate('/aprender')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '0.75rem', borderRadius: '50%' }}>
            <BookOpen size={32} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Aprender algo útil hoy</h3>
            <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Tema: Llamadas seguras</p>
          </div>
        </button>

        <button 
          className="card flex items-center gap-md"
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', margin: 0 }}
          onClick={() => alert('Llamando a Juan (Persona de confianza)...')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '0.75rem', borderRadius: '50%' }}>
            <Phone size={32} color="var(--color-text-main)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Llamar a Juan</h3>
            <p className="text-muted" style={{ margin: 0, fontSize: '1rem' }}>Hijo (Persona de confianza)</p>
          </div>
        </button>

      </div>
    </>
  );
};
