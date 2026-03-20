import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to login after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="flex-col items-center justify-center" 
      style={{ 
        height: '100vh', 
        backgroundColor: 'var(--color-bg-main)',
        padding: '2rem'
      }}
    >
      <div 
        className="flex items-center justify-center"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>AMAUI</h1>
      </div>
      <h2 className="text-center text-primary" style={{ fontSize: '2rem' }}>
        Tu asistente de salud
      </h2>
      <p className="text-center text-muted text-xl" style={{ marginTop: '1rem' }}>
        Te acompaño paso a paso
      </p>
    </div>
  );
};
