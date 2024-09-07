import axios from 'axios';

export const generateOtp = async () => {
  try {
    const response = await axios.post('/api/otp/generate');
    return response.data;
  } catch (error) {
    console.error('Error generating OTP:', error);
    return null;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await axios.post('https://otp-service-beta.vercel.app/api/otp/verify', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
