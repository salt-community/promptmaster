import { ReactNode, useState } from "react";
import { LoginContext } from "../hooks/useLogin";

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [login, setLogin] = useState<string>("");

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
