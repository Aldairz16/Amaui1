import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, UsersRound } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setRole, setActiveContext } = useAppContext();

  const handleSelect = (r: 'user' | 'caregiver' | 'mixed') => {
    setRole(r);
    setActiveContext(r === 'caregiver' ? 'caregiver' : 'self');
    navigate(r === 'caregiver' ? '/caregiver' : '/onboarding');
  };

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
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '1.5rem', margin: 0 }}
          onClick={() => handleSelect('user')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
            <User size={36} color="var(--color-primary)" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-primary)' }}>Uso AMAUI para mí</h2>
            <p className="text-muted" style={{ margin: 0, marginTop: '0.5rem', fontSize: '1rem' }}>
              Para cuidar mi salud y aprender.
            </p>
          </div>
        </button>

        {/* Caregiver Card */}
        <button 
          className="card flex items-center gap-md" 
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '1.5rem', margin: 0 }}
          onClick={() => handleSelect('caregiver')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
            <Users size={36} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-secondary)' }}>Acompaño a otra persona</h2>
            <p className="text-muted" style={{ margin: 0, marginTop: '0.5rem', fontSize: '1rem' }}>
              Para ser cuidador o familiar.
            </p>
          </div>
        </button>

        {/* Mixed Role Card */}
        <button 
          className="card flex items-center gap-md" 
          style={{ width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '1.5rem', margin: 0 }}
          onClick={() => handleSelect('mixed')}
        >
          <div style={{ backgroundColor: 'var(--color-bg-main)', padding: '1rem', borderRadius: '50%' }}>
            <UsersRound size={36} color="var(--color-alert-mod)" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--color-text-main)' }}>Hago ambos</h2>
            <p className="text-muted" style={{ margin: 0, marginTop: '0.5rem', fontSize: '1rem' }}>
              Superviso mi salud y la de alguien más.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
