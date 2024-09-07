import { useState } from 'react';
import { useOtp } from '../context/OtpContext';
import axios from 'axios';

export default function OtpVerifier() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { email } = useOtp(); // Use context for email

  const handleVerifyOtp = async () => {
    if (!otp) {
      setResult('Please enter the OTP');
      return;
    }

    setLoading(true);
    setResult(null);
    const data = {
      email: email,
      otp: otp
    };

    try {
      const response = await axios.post('https://otp-service-beta.vercel.app/api/otp/verify', data);
      if (response.data && response.data.message) { // Ensure correct response handling
        setResult(response.data.message);
      } else {
        setResult('OTP Verification Failed');
      }
    } catch (error) {
      setResult('An error occurred during verification: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <a href="#_" className="relative inline-flex items-center justify-center overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 w-64 h-16">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span className="absolute inset-0 flex items-center justify-center text-white transition-all duration-300 ease-in-out group-hover:text-lg">
          <button onClick={handleVerifyOtp} className="w-full" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </span>
      </a>
      {result && (
        <div className={`mt-4 text-lg font-semibold ${result.includes('verified') ? 'text-green-600' : 'text-red-600'}`}>
          {result}
        </div>
      )}
    </div>
  );
}
