import React, { useState } from 'react';
import { Button, Input } from '../components/UI';
import { Share2, HeartPulse, Plus } from 'lucide-react';

export const Salud: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [sys, setSys] = useState('');
  const [dia, setDia] = useState('');

  // Mock data for the chart
  const history = [
    { day: 'Lun', sys: 120, dia: 80, state: 'normal' },
    { day: 'Mar', sys: 125, dia: 82, state: 'normal' },
    { day: 'Mié', sys: 135, dia: 88, state: 'attention' },
    { day: 'Hoy', sys: 145, dia: 95, state: 'alert' }
  ];

  const getStateColor = (state: string) => {
    switch(state) {
      case 'normal': return 'var(--color-primary)';
      case 'attention': return 'var(--color-alert-mod)';
      case 'alert': return 'var(--color-error)';
      default: return 'var(--color-border)';
    }
  };

  const handleShare = () => {
    alert("Generando reporte para compartir por WhatsApp...");
  };

  return (
    <>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
          Mi Salud
        </h1>
        <button 
          className="btn-ghost flex items-center gap-xs" 
          onClick={handleShare}
          style={{ padding: '0.5rem 1rem', borderRadius: '16px' }}
        >
          <Share2 size={24} color="var(--color-primary)" />
          <span className="text-bold text-primary">Compartir</span>
        </button>
      </div>

      {!showLog ? (
        <>
          {/* Quick Record Action */}
          <div className="card flex-col items-center justify-center text-center" style={{ padding: '2rem' }}>
            <HeartPulse size={64} color="var(--color-alert-mod)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Registrar Presión</h2>
            <p className="text-lg text-muted" style={{ marginBottom: '1.5rem' }}>Anota cómo amaneciste hoy para llevar tu control.</p>
            <Button onClick={() => setShowLog(true)}>
              <Plus size={24} style={{ marginRight: '8px' }} />
              Anotar ahora
            </Button>
          </div>

          {/* Simple Chart */}
          <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }}>Esta semana</h2>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-end" style={{ height: '150px', paddingBottom: '1rem', borderBottom: '2px solid var(--color-border)' }}>
              {history.map((record, i) => (
                <div key={i} className="flex-col items-center gap-sm">
                  {/* Visual Bar relative to a baseline */}
                  <div style={{ position: 'relative', width: '32px', height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div 
                      style={{ 
                        width: '100%', 
                        height: `${(record.sys / 160) * 100}%`, 
                        backgroundColor: getStateColor(record.state),
                        borderRadius: '4px',
                        transition: 'height 0.3s'
                      }} 
                    />
                  </div>
                  <span className="text-bold text-lg">{record.day}</span>
                </div>
              ))}
            </div>
            
            <div className="flex-col gap-sm" style={{ marginTop: '1.5rem' }}>
              <div className="flex items-center gap-sm">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                <span className="text-lg">Normal (Tranquilo)</span>
              </div>
              <div className="flex items-center gap-sm">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-alert-mod)' }} />
                <span className="text-lg">Atención (Cuídate)</span>
              </div>
              <div className="flex items-center gap-sm">
                <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--color-error)' }} />
                <span className="text-lg">Alerta (Consulta al doctor)</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Simple Log Form */
        <div className="card flex-col gap-md">
          <h2 style={{ fontSize: '1.75rem', color: 'var(--color-primary)', margin: 0 }}>¿Cuánto marcó tu tensiómetro?</h2>
          
          <Input 
            label="Número más alto (Sistólica):" 
            placeholder="Ej. 120"
            type="tel"
            inputMode="numeric"
            value={sys}
            onChange={e => setSys(e.target.value.replace(/[^0-9]/g, ''))}
          />
          <Input 
            label="Número más bajo (Diastólica):" 
            placeholder="Ej. 80"
            type="tel"
            inputMode="numeric"
            value={dia}
            onChange={e => setDia(e.target.value.replace(/[^0-9]/g, ''))}
          />

          <div className="flex-col gap-sm" style={{ marginTop: '1rem' }}>
            <Button onClick={() => setShowLog(false)} disabled={!sys || !dia}>
              Guardar registro
            </Button>
            <Button variant="ghost" onClick={() => setShowLog(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
