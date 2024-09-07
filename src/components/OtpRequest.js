import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOtp } from '../context/OtpContext';

export default function OtpRequest() {
  const [result, setResult] = useState(null);
  const { email, setEmail } = useOtp(); // Use context for email
  const [otpType, setOtpType] = useState('numeric');
  const [organization, setOrganization] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    let timer;
    if (result) {
      timer = setTimeout(() => {
        setResult(null);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [result]);

  const sendOtpRequest = async () => {
    if (email === '') {
      setResult('Please enter the email');
      return;
    }
    if (organization === '') {
      setResult('Please enter the organization name');
      return;
    }
    const data = {
      email: email, // email from user input
      type: otpType,
      organization: organization,
      subject: subject,
    };

    try {
      const response = await axios.post('https://otp-service-beta.vercel.app/api/otp/generate', data); // Use the proxied path
      setResult(response.data.message); // Set the result to the response message
    } catch (error) {
      setResult('Error sending OTP request: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 border border-grey-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update context email
      />
      <input
        type="text"
        placeholder="Enter organization name"
        className="w-full px-4 py-2 mb-4 border border-grey-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter email subject"
        className="w-full px-4 py-2 mb-4 border border-grey-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <select
        className="w-full px-4 py-2 mb-4 border border-grey-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={otpType}
        onChange={(e) => setOtpType(e.target.value)}
      >
        <option value="numeric">Numeric</option>
        <option value="alphanumeric">Alphanumeric</option>
        <option value="alphabet">Alphabet-based</option>
      </select>
      <a href="#_" className="relative inline-flex items-center justify-center p-1 px-1 py-8 overflow-hidden font-medium text-indigo-600 transition duration-400 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 w-64">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="absolute inset-0 flex items-center justify-center text-bold text-white transition-all duration-300 ease-in-out group-hover:text-lg">
          <button onClick={sendOtpRequest} className="w-full text-bold text-white">Send OTP</button>
        </span>
      </a>
      {result && (
        <div className={`mt-4 text-lg font-semibold ${result.includes('OTP is generated') ? 'text-green-600' : 'text-red-600'}`}>
          {result}
        </div>
      )}
    </div>
  );
}

