import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle, BatteryMedium, HeartPulse, LogOut } from 'lucide-react';

export const Caregiver: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ paddingBottom: '2rem' }}>
      
      {/* Header */}
      <div className="flex justify-between items-start" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', margin: 0 }}>
            Panel de Cuidador
          </h1>
          <p className="text-lg text-muted" style={{ marginTop: '0.5rem' }}>
            Viendo información de: <strong style={{ color: 'var(--color-text-main)' }}>María (Madre)</strong>
          </p>
        </div>
        <button 
          className="btn-ghost" 
          style={{ padding: '0.5rem', borderRadius: '50%' }}
          onClick={() => navigate('/')}
          aria-label="Cerrar sesión"
        >
          <LogOut size={28} color="var(--color-text-muted)" />
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="card flex items-center gap-sm" style={{ backgroundColor: '#E0F2FE', borderColor: '#BAE6FD', borderWidth: 2, borderStyle: 'solid', padding: '1rem' }}>
        <ShieldCheck size={32} color="#0284C7" style={{ flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#0369A1' }}>
          <strong>Privacidad:</strong> Solo puedes ver el estado de sus medicinas y recibir alertas críticas. Las interacciones de aprendizaje son privadas.
        </p>
      </div>

      {/* Summary Stats */}
      <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>Resumen de Hoy</h2>
      <div className="flex gap-sm">
        <div className="card flex-col items-center justify-center text-center" style={{ flex: 1, padding: '1rem', margin: 0 }}>
          <CheckCircle size={32} color="var(--color-primary)" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-primary)' }}>1/2</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Medicinas tomadas</p>
        </div>
        <div className="card flex-col items-center justify-center text-center" style={{ flex: 1, padding: '1rem', margin: 0 }}>
          <HeartPulse size={32} color="var(--color-accent)" style={{ marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-text-main)' }}>145/95</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.85rem' }}>Presión (Mañana)</p>
        </div>
      </div>

      {/* Alerts / Tasks */}
      <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>Alertas y Avisos</h2>
      <div className="flex-col gap-sm">
        
        <div className="card flex gap-md items-center" style={{ margin: 0, borderLeft: '4px solid var(--color-error)' }}>
          <div style={{ backgroundColor: '#FEE2E2', padding: '0.75rem', borderRadius: '50%' }}>
            <HeartPulse size={24} color="var(--color-error)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Presión elevada</h3>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>El registro de hoy superó lo normal (Alerta generada a las 8:00 AM).</p>
          </div>
        </div>

        <div className="card flex gap-md items-center" style={{ margin: 0, borderLeft: '4px solid var(--color-alert-mod)' }}>
          <div style={{ backgroundColor: '#FEF3C7', padding: '0.75rem', borderRadius: '50%' }}>
            <BatteryMedium size={24} color="var(--color-alert-mod)" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Stock bajo: Atorvastatina</h3>
            <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem' }}>Quedan 3 pastillas. Considera reponer esta semana.</p>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p className="text-muted text-lg">No hay más alertas recientes.</p>
      </div>

    </div>
  );
};
