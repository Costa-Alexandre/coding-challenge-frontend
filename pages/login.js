import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

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
    <main>
      <section>
        <h2>Log In</h2>
        {message && <div>{message}</div>}
        {error && <div>{error}</div>}
        <form>
          <div>
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
          </div>
          <div>
            <label htmlFor="password-input">
              Password
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button disabled={loading} type="button" onClick={handleSubmit}>
            Log In
          </button>
        </form>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </section>
      <section>
        <p>Need an account?</p>
        <Link href="/signup">Sign Up</Link>
      </section>
    </main>
  );
}
