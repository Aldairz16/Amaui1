import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wizard } from '../components/Wizard';
import { Input } from '../components/UI';
import { ShieldAlert } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mainCondition, setMainCondition] = useState('');
  const [otherCondition, setOtherCondition] = useState('');
  
  // Trusted Person State
  const [trustedName, setTrustedName] = useState('');
  const [trustedPhone, setTrustedPhone] = useState('');
  const [trustedRole, setTrustedRole] = useState('Hijo/a');

  const goToNextStep = () => {
    setStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setStep(prev => prev - 1);
  };

  const completeOnboarding = () => {
    navigate('/home');
  };

  return (
    <>
      {step === 1 && (
        <Wizard 
          currentStep={1} totalSteps={4}
          title="Hola, ¿cómo te llamas?"
          subtitle="Queremos conocerte mejor."
          onNext={goToNextStep}
          canProceed={name.trim().length > 1}
        >
          <Input 
            label="Mi nombre es:" 
            placeholder="Ej. María" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Wizard>
      )}

      {step === 2 && (
        <Wizard 
          currentStep={2} totalSteps={4}
          title={`Mucho gusto, ${name}. ¿Cuántos años tienes?`}
          onNext={goToNextStep}
          onPrev={goToPrevStep}
          canProceed={age.length > 1}
        >
          <Input 
            label="Mi edad:" 
            type="tel"
            inputMode="numeric"
            placeholder="Ej. 65" 
            value={age}
            onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={3}
          />
        </Wizard>
      )}

      {step === 3 && (
        <Wizard 
          currentStep={3} totalSteps={4}
          title="Hablemos de tu salud"
          subtitle="Esto nos ayuda a configurar tus avisos y alertas."
          onNext={goToNextStep}
          onPrev={goToPrevStep}
          canProceed={mainCondition.trim().length > 2}
        >
          <Input 
            label="¿Qué condición de salud cuidas más?" 
            placeholder="Ej. Hipertensión, Diabetes..." 
            value={mainCondition}
            onChange={(e) => setMainCondition(e.target.value)}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <Input 
              label="Otra enfermedad o cuidado (opcional):" 
              placeholder="Ej. Asma, colesterol..." 
              value={otherCondition}
              onChange={(e) => setOtherCondition(e.target.value)}
            />
          </div>
        </Wizard>
      )}

      {step === 4 && (
        <Wizard 
          currentStep={4} totalSteps={4}
          title="Persona de confianza"
          subtitle="Añade a alguien. Queremos ayudarte sin invadir tu espacio."
          onComplete={completeOnboarding}
          onPrev={goToPrevStep}
          canProceed={trustedName.length > 2 && trustedPhone.length >= 9}
        >
          <div className="card flex gap-sm" style={{ backgroundColor: 'var(--color-bg-main)', border: '1px solid var(--color-primary)' }}>
            <ShieldAlert size={24} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-main)' }}>
              Solo le avisaremos si hay una alerta importante o si lo necesitas. Tú tienes el control en todo momento.
            </p>
          </div>

          <Input 
            label="Nombre de esa persona:" 
            placeholder="Ej. Juan" 
            value={trustedName}
            onChange={(e) => setTrustedName(e.target.value)}
          />

          <div style={{ marginTop: '1rem' }}>
            <Input 
              label="Número de celular:" 
              type="tel"
              inputMode="numeric"
              placeholder="Ej. 987654321" 
              value={trustedPhone}
              onChange={(e) => setTrustedPhone(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={9}
            />
          </div>

          <div style={{ marginTop: '1rem' }} className="form-group">
            <label className="label">¿Qué parentesco o relación tienen?</label>
            <select 
              className="input" 
              value={trustedRole}
              onChange={(e) => setTrustedRole(e.target.value)}
            >
              <option value="Hijo/a">Hijo o Hija</option>
              <option value="Esposo/a">Esposo o Esposa</option>
              <option value="Nieto/a">Nieto o Nieta</option>
              <option value="Cuidador/a">Cuidador o Cuidadora</option>
              <option value="Amigo/a">Amigo de confianza</option>
              <option value="Otro">Otro familiar</option>
            </select>
          </div>
        </Wizard>
      )}
    </>
  );
};
