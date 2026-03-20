import React from 'react';
import { Button } from './UI';

interface WizardProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  children: React.ReactNode;
  canProceed?: boolean;
}

export const Wizard: React.FC<WizardProps> = ({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onNext,
  onPrev,
  onComplete,
  children,
  canProceed = true
}) => {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  return (
    <div className="flex-col" style={{ flex: 1, minHeight: '100vh', padding: '1.5rem', backgroundColor: 'var(--color-bg-main)'}}>
      {/* Progress Bar */}
      <div className="flex gap-sm" style={{ marginBottom: '2rem' }}>
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <div 
            key={idx} 
            style={{ 
              flex: 1, 
              height: '8px', 
              borderRadius: '4px', 
              backgroundColor: idx + 1 <= currentStep ? 'var(--color-primary)' : 'var(--color-border)',
              transition: 'background-color 0.3s'
            }} 
          />
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>{title}</h1>
        {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
        
        <div style={{ marginTop: '2rem' }}>
          {children}
        </div>
      </div>

      <div className="flex-col gap-sm" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
        {isLast ? (
          <Button onClick={onComplete} disabled={!canProceed}>
            ¡Completar!
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!canProceed}>
            Siguiente
          </Button>
        )}
        
        {!isFirst && (
          <Button variant="ghost" onClick={onPrev}>
            Retroceder
          </Button>
        )}
      </div>
    </div>
  );
};
