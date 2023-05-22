import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

import styles from './styles/login.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      setError('');
      await resetPassword(email);
      router.push({
        pathname: '/login',
        query: { message: 'Password reset email sent! Check your inbox' },
      });
    } catch {
      setError('Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Password Reset</h2>
        {error && <div>{error}</div>}
        <form>
          <label htmlFor="email-input">
            Email
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <button disabled={loading} type="button" onClick={handleSubmit}>
            Reset Password
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <div>
          <Link href="/login">Log in</Link>
        </div>
        <div>
          <div>Need an account?</div>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
