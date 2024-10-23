import { createContext, useContext } from "react";

interface LoginContextType {
  login: string;
  setLogin: (login: string) => void;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined
);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
