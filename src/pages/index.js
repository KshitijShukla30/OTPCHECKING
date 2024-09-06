import OtpRequest from '../components/OtpRequest';
import OtpVerifier from '../components/OtpVerifier';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-extrabold text-white mb-10">OTP Service</h1>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md mb-8">
        <OtpRequest />
      </div>
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <OtpVerifier />
      </div>
    </div>
  );
}
