import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users } from 'lucide-react';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ justifyContent: 'center', minHeight: '100vh', paddingBottom: '2rem' }}>
      <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1rem' }}>
        ¿Quién eres?
      </h1>
      <p className="text-xl" style={{ marginBottom: '3rem' }}>
        Elige cómo usarás la aplicación hoy.
      </p>

      <div className="flex-col gap-lg">
        {/* Main User Card */}
        <button 
          className="card flex items-center gap-md" 
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '2rem' }}
          onClick={() => navigate('/onboarding')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
            <User size={48} color="var(--color-primary)" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--color-primary)' }}>Soy el usuario principal</h2>
            <p className="text-muted" style={{ margin: 0, marginTop: '0.5rem', fontSize: '1.1rem' }}>
              Para cuidar mi salud y aprender.
            </p>
          </div>
        </button>

        {/* Caregiver Card */}
        <button 
          className="card flex items-center gap-md" 
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '2rem' }}
          onClick={() => navigate('/caregiver')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
            <Users size={48} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--color-secondary)' }}>Soy familiar o cuidador</h2>
            <p className="text-muted" style={{ margin: 0, marginTop: '0.5rem', fontSize: '1.1rem' }}>
              Para acompañar y ayudar.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
