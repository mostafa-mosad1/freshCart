/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();

function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("Token") != null) {
      setToken(localStorage.getItem("Token"));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContextProvider;
