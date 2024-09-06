import { OtpProvider } from '../context/OtpContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <OtpProvider>
      <Component {...pageProps} />
    </OtpProvider>
  );
}

export default MyApp;
