import React, { createContext, useState } from 'react';
import { AuthInterface } from '../@types/Auth';

export const UserContext = createContext({});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthInterface>({
    name: '',
    username: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
