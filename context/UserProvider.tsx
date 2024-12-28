import React, { createContext, useContext, useState } from 'react';

interface UserData {
  userId: number | null;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserContextProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};