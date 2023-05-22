import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

import styles from './styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const { message } = router.query;

  const handleSubmit = async () => {
    setLoading(true);

    try {
      setError('');
      await login(email, password);
      router.push('/');
    } catch {
      setError('Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Log In</h2>
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
        <form>
          <label htmlFor="email-input">
            <div>Email:</div>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password-input">
            <div>Password: </div>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button disabled={loading} type="button" onClick={handleSubmit}>
            Log In
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
          <div>Need an account?</div>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
