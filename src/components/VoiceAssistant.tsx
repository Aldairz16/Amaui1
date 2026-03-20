import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, HelpCircle, Repeat, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();

  // Web Speech API: Text-To-Speech (Hablar)
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Detener cualquier audio previo
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Idioma Español
      utterance.rate = 0.9; // Velocidad ligeramente más lenta para claridad
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Lo siento, tu navegador no soporta la función de voz.");
    }
  };

  // Leer toda la pantalla actual
  const readScreen = () => {
    setIsActive(false);
    // Busca el contenedor principal y lee su contenido en texto plano
    const container = document.querySelector('.page-container');
    if (container) {
      // Limpia un poco el texto para que no lea botones de UI innecesarios
      const textToRead = (container as HTMLElement).innerText;
      if (textToRead.trim() !== '') {
        speak("En esta pantalla dice: " + textToRead);
      } else {
        speak("Esta pantalla está vacía.");
      }
    } else {
      speak("No encontré contenido para leer en esta pantalla.");
    }
  };

  // Respuestas dinámicas simuladas
  const handleCommand = (commandType: string) => {
    setIsActive(false);

    switch (commandType) {
      case 'meds':
        speak("Te toca tomar Paracetamol en 15 minutos. No te olvides.");
        break;
      case 'repeat':
        speak("Claro, te repito. Recuerda tomar tu pastilla con un vaso de agua.");
        break;
      case 'learn':
        navigate('/aprender');
        speak("Vamos a la sección de aprender. Toca cualquier taller para comenzar.");
        break;
      default:
        speak("¿En qué te puedo ayudar?");
    }
  };

  // Detener el audio si el componente se desmonta inesperadamente
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <>
      {isActive && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(247, 244, 237, 0.95)', // Crema opaco
            zIndex: 45,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '2rem',
            paddingTop: '5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {/* Header Close Button */}
          <div className="flex justify-end" style={{ width: '100%', marginBottom: '1rem' }}>
             <button onClick={() => setIsActive(false)} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>
               Cerrar X
             </button>
          </div>

          <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', textAlign: 'center', margin: 0 }}>
            {isSpeaking ? "Hablando..." : "¿En qué te ayudo?"}
          </h2>
          <p className="text-lg text-muted text-center" style={{ marginBottom: '2rem', marginTop: '0.5rem' }}>
            Toca una opción para escuchar:
          </p>

          <div className="flex-col gap-md">
            {/* Opción Leer Pantalla */}
            <button 
              className="card flex items-center gap-md" 
              style={{ border: '2px solid var(--color-border)', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} 
              onClick={readScreen}
            >
              <div style={{ backgroundColor: '#E0F2FE', padding: '0.75rem', borderRadius: '50%' }}>
                <Volume2 size={32} color="#0284C7" />
              </div>
              <span className="text-bold text-xl" style={{ color: 'var(--color-text-main)' }}>"Léeme esta pantalla"</span>
            </button>

            {/* Opción ¿Qué toca ahora? */}
            <button 
              className="card flex items-center gap-md" 
              style={{ border: '2px solid var(--color-border)', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} 
              onClick={() => handleCommand('meds')}
            >
              <div style={{ backgroundColor: '#FEF3C7', padding: '0.75rem', borderRadius: '50%' }}>
                <HelpCircle size={32} color="#D97706" />
              </div>
              <span className="text-bold text-xl" style={{ color: 'var(--color-text-main)' }}>"¿Qué me toca ahora?"</span>
            </button>

            {/* Opción Repetir */}
            <button 
              className="card flex items-center gap-md" 
              style={{ border: '2px solid var(--color-border)', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} 
              onClick={() => handleCommand('repeat')}
            >
              <div style={{ backgroundColor: '#DCFCE7', padding: '0.75rem', borderRadius: '50%' }}>
                <Repeat size={32} color="#16A34A" />
              </div>
              <span className="text-bold text-xl" style={{ color: 'var(--color-text-main)' }}>"Repite por favor"</span>
            </button>
            
            {/* Opción Ir a Aprender */}
            <button 
              className="card flex items-center gap-md" 
              style={{ border: '2px solid var(--color-border)', margin: 0, textAlign: 'left', padding: '1.5rem', borderRadius: '16px' }} 
              onClick={() => handleCommand('learn')}
            >
              <div style={{ backgroundColor: '#F3F4F6', padding: '0.75rem', borderRadius: '50%' }}>
                <ArrowRight size={32} color="#4B5563" />
              </div>
              <span className="text-bold text-xl" style={{ color: 'var(--color-text-main)' }}>"Llévame a aprender"</span>
            </button>
          </div>
          
          <div style={{ flex: 1 }} />
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className={`fab-voice ${isActive || isSpeaking ? 'active' : ''}`}
        onClick={() => {
          if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
          } else {
            setIsActive(!isActive);
          }
        }}
        aria-label={isSpeaking ? "Silenciar asistente" : (isActive ? "Cerrar asistente" : "Hablar con AMAUI")}
        style={{ zIndex: 50 }}
      >
        {isActive || isSpeaking ? <Mic size={32} /> : <MicOff size={32} />}
      </button>

      {/* Basic Keyframe Injection for FadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
