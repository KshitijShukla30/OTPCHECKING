import { createContext, useContext, useState } from 'react';

const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [email, setEmail] = useState('');

  return (
    <OtpContext.Provider value={{ email, setEmail }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => useContext(OtpContext);
