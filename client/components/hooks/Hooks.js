import React, { createContext, useState, useContext } from "react";

const ActiveContext = createContext();

export const Hooks = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState("Main");
  const [loggined, setLoggined] = useState(false);
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [activeDBM, setActiveDBM] = useState("/");
  const [wallet, setWallet] = useState("");

  return (
    <ActiveContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        loggined,
        setLoggined,
        user,
        setUser,
        token,
        setToken,
        registrationStep,
        setRegistrationStep,
        activeDBM,
        setActiveDBM,
        wallet,
        setWallet,
      }}
    >
      {children}
    </ActiveContext.Provider>
  );
};

export const useHook = () => useContext(ActiveContext);
