import '../styles/globals.css';
import { roboto } from '../fonts';
import AuthProvider from '../contexts/Auth';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className={roboto.className}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
