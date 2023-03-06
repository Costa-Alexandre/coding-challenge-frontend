import '../styles/globals.css';
import { roboto } from '../fonts';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={roboto.className}>
      <Component {...pageProps} />
    </div>
  );
}
