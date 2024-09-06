import { useState } from "react";
import { generateOtp } from "../services/otpService";
export default function OtpGenerator() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGenerateOtp = async () => {
    setLoading(true);
    const response = await generateOtp();
    if(response && response.otp){
      setOtp(response.otp);
    }else{
      alert('Failed to generate OTP');
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">OTP Generator</h2>
      <button
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        onClick={handleGenerateOtp}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate OTP"}
      </button>
      {otp && (
        <p className="mt-6 text-xl font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-lg">
          Generated OTP: <span className="text-2xl">{otp}</span>
        </p>
      )}
    </div>
  );
}