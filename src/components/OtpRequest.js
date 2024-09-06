import axios from 'axios';
import { useState, useEffect } from 'react';

export default function OtpRequest() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  useEffect(() => {
    let timer;
    if (result) {
      timer = setTimeout(() => {
        setResult(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [result]);
  const sendOtpRequest = async () => {
    if (email === '') {
      setResult('Please enter the email');
      return;
    }
    const data = {
      email: email, // email from user input
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
    <div className="flex flex-col items-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 border border-grey-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <a href="#_" className="relative inline-flex items-center justify-center p-1 px-1 py-8 overflow-hidden font-medium text-indigo-600 transition duration-400 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 w-64">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="absolute inset-0 flex items-center justify-center text-bold text-white transition-all duration-300 ease-in-out group-hover:text-lg">
          <button onClick={sendOtpRequest} className="w-full text-bold text-white">Send OTP</button>
        </span>
      </a>
      {result && (
        <div className={`mt-4 text-lg font-semibold ${result.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
          {result}
        </div>
      )}
    </div>
  );
}

