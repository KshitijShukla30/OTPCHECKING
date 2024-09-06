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

export const verifyOtp = async (otp) => {
  try {
    const response = await axios.post('/api/otp/verify', { otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return null;
  }
};
