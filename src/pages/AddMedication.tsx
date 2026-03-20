import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wizard } from '../components/Wizard';
import { Input, Button } from '../components/UI';

export const AddMedication: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [time, setTime] = useState('');
  const [stock, setStock] = useState('');

  const goToNextStep = () => setStep(prev => prev + 1);
  const goToPrevStep = () => setStep(prev => prev - 1);
  const finish = () => navigate('/medicinas');

  return (
    <>
      {step === 1 && (
        <Wizard 
          currentStep={1} totalSteps={3}
          title="¿Qué medicina es?"
          onNext={goToNextStep}
          canProceed={name.trim().length > 1}
        >
          <Input 
            label="Nombre de la pastilla o medicina:" 
            placeholder="Ej. Paracetamol" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <Input 
              label="¿Para qué sirve? (Opcional):" 
              placeholder="Ej. Para el dolor" 
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            />
          </div>
        </Wizard>
      )}

      {step === 2 && (
        <Wizard 
          currentStep={2} totalSteps={3}
          title="¿A qué hora te toca?"
          onNext={goToNextStep}
          onPrev={goToPrevStep}
          canProceed={time.length > 0}
        >
          <Input 
            label="Hora de la primera toma:" 
            type="time" 
            value={time}
            onChange={e => setTime(e.target.value)}
            style={{ padding: '1rem', fontSize: '1.5rem' }}
          />

          <div style={{ marginTop: '2rem' }} className="form-group">
            <label className="label">¿Cada cuánto tiempo?</label>
            <div className="flex-col gap-sm">
              <Button variant="outline" onClick={() => {}} style={{ justifyContent: 'flex-start' }}>Una vez al día</Button>
              <Button variant="outline" onClick={() => {}} style={{ justifyContent: 'flex-start' }}>Cada 12 horas</Button>
              <Button variant="outline" onClick={() => {}} style={{ justifyContent: 'flex-start' }}>Cada 8 horas</Button>
              <Button variant="ghost" onClick={() => {}}>Otra opción...</Button>
            </div>
          </div>
        </Wizard>
      )}

      {step === 3 && (
        <Wizard 
          currentStep={3} totalSteps={3}
          title="¿Cuántas tienes ahora?"
          subtitle="Te avisaremos cuando se estén acabando."
          onComplete={finish}
          onPrev={goToPrevStep}
          canProceed={stock.length > 0}
        >
          <Input 
            label="Cantidad de pastillas en casa:" 
            type="tel"
            inputMode="numeric"
            placeholder="Ej. 20" 
            value={stock}
            onChange={e => setStock(e.target.value.replace(/[^0-9]/g, ''))}
          />
        </Wizard>
      )}
    </>
  );
};
