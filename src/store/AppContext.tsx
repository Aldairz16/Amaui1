import React, { createContext, useContext, useState } from 'react';

type Role = 'user' | 'caregiver' | 'mixed' | null;
type ActiveContext = 'self' | 'caregiver';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  activeContext: ActiveContext;
  setActiveContext: (context: ActiveContext) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('mixed'); // Defaulting to mixed for demo purposes
  const [activeContext, setActiveContext] = useState<ActiveContext>('self');

  return (
    <AppContext.Provider value={{ role, setRole, activeContext, setActiveContext }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
