import React from 'react';

interface SegmentedControlProps {
  activeValue: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ activeValue, onChange, options }) => {
  return (
    <div 
      className="flex" 
      style={{ 
        backgroundColor: 'var(--color-border)', 
        borderRadius: 'var(--radius-full)', 
        padding: '4px',
        width: '100%',
        marginBottom: '1rem' 
      }}
    >
      {options.map((opt) => {
        const isActive = activeValue === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
