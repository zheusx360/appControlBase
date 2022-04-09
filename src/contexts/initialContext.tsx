import React, {createContext, ReactNode, useState} from 'react';

type InitialContextProps = {
  children: ReactNode;
};

type InitialContextType = {
  darkTheme: string;
  setTheme: (newState: string) => void;
  user: object;
  setUser: (newState: string) => void;
  token: string;
  setToken: (newState: string) => void;
};

const initialValue = {
  darkTheme: '',
  setTheme: () => {},
  user: {},
  setUser: () => {},
  token: '',
  setToken: () => {},
};

export const InitialContext = createContext<InitialContextType>(initialValue);

export const InitialContextProvider = ({children}: InitialContextProps) => {
  const [darkTheme, setTheme] = useState(initialValue.darkTheme);
  const [user, setUser] = useState(initialValue.user);
  const [token, setToken] = useState(initialValue.token);

  return (
    <InitialContext.Provider
      value={{setUser, setTheme, setToken, token, user, darkTheme}}>
      {children}
    </InitialContext.Provider>
  );
};
