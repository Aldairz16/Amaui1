import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI';
import { Plus, Check, Clock } from 'lucide-react';

export const Medicinas: React.FC = () => {
  const navigate = useNavigate();
  // Mock timeline data
  const [meds, setMeds] = useState([
    { id: 1, name: 'Losartán 50mg', purpose: 'Para la presión', time: '08:00 AM', taken: true, stock: '20 pastillas' },
    { id: 2, name: 'Metformina 850mg', purpose: 'Para el azúcar', time: '02:00 PM', taken: false, stock: '15 pastillas' },
    { id: 3, name: 'Atorvastatina', purpose: 'Para el colesterol', time: '08:00 PM', taken: false, stock: 'Quedan pocas (3)' }
  ]);

  const markAsTaken = (id: number) => {
    setMeds(meds.map(m => m.id === id ? { ...m, taken: true } : m));
  };

  return (
    <>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', margin: 0 }}>
          Mis Medicinas
        </h1>
        <button 
          className="btn-primary flex items-center justify-center" 
          style={{ width: '48px', height: '48px', borderRadius: '50%', padding: 0 }}
          onClick={() => navigate('/add-medication')}
          aria-label="Agregar medicamento"
        >
          <Plus size={28} />
        </button>
      </div>

      <div className="flex-col gap-md" style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{ 
          position: 'absolute', 
          left: '24px', 
          top: '20px', 
          bottom: '20px', 
          width: '2px', 
          backgroundColor: 'var(--color-border)',
          zIndex: -1 
        }} />

        {meds.map((med) => (
          <div key={med.id} className="card flex gap-md" style={{ position: 'relative', margin: 0 }}>
            {/* Timeline dot */}
            <div style={{ 
              width: '16px', 
              height: '16px', 
              borderRadius: '50%', 
              backgroundColor: med.taken ? 'var(--color-primary)' : 'var(--color-alert-mod)',
              position: 'absolute',
              left: '-23px', /* Approximate position on the line */
              top: '24px'
            }} />

            <div className="flex-col w-full">
              <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                <div className="flex items-center gap-xs text-primary text-bold text-lg">
                  <Clock size={20} />
                  <span>{med.time}</span>
                </div>
                {med.taken && (
                  <div className="badge badge-success">
                    <Check size={16} style={{ marginRight: '4px' }} /> Tomada
                  </div>
                )}
              </div>

              <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{med.name}</h2>
              <p className="text-xl text-muted" style={{ marginBottom: '1rem' }}>{med.purpose}</p>

              {!med.taken && (
                <div className="flex-col gap-sm">
                  <Button onClick={() => markAsTaken(med.id)}>
                    Sí, ya la tomé
                  </Button>
                  <Button variant="outline">
                    Recordar en 15 min
                  </Button>
                </div>
              )}

              {/* Stock info */}
              <div 
                style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  backgroundColor: med.stock.includes('pocas') ? '#FEE2E2' : 'var(--color-bg-main)', 
                  borderRadius: 'var(--radius-sm)',
                  color: med.stock.includes('pocas') ? 'var(--color-error)' : 'var(--color-text-muted)'
                }}
              >
                <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Tengo: {med.stock}</p>
              </div>
            </div>
          </div>
        ))}

        {meds.length === 0 && (
          <p className="text-xl text-center text-muted">Aún no tienes medicinas registradas.</p>
        )}
      </div>
    </>
  );
};
