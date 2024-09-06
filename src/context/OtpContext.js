import axios from 'axios';
import { useState, createContext, useContext } from 'react';

const OtpContext = createContext();

export function OtpProvider({ children }) {
  const [email, setEmail] = useState('');

  const sendOtpRequest = async () => {
    const data = {
      email: email,
      type: "numeric",
      organization: "MyApp",
      subject: "OTP Verification",
    };

    try {
      const response = await axios.post('/api/otp/generate', data);
      console.log('OTP sent:', response.data);
    } catch (error) {
      console.error('Error sending OTP request:', error);
    }
  };

  return (
    <OtpContext.Provider value={{ email, setEmail, sendOtpRequest }}>
      {children}
    </OtpContext.Provider>
  );
}

export function useOtp() {
  return useContext(OtpContext);
}

// You can keep the OtpRequest component if needed, or move it to a separate file
export function OtpRequest() {
  const { email, setEmail, sendOtpRequest } = useOtp();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <label className="text-xl text-gray-700 font-semibold mb-4 self-start" htmlFor="email">
        Enter Your Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@domain.com"
        className="w-full px-4 py-3 mb-6 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
      />
      <button
        onClick={sendOtpRequest}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg shadow-md text-lg font-semibold hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
      >
        Send OTP
      </button>
    </div>
  );
}
