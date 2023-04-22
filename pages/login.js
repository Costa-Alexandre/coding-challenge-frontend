import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, loading, setLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const { message } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
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
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-input">
              Email
              <input id="email-input" type="email" ref={emailRef} required />
            </label>
          </div>
          <div>
            <label htmlFor="password-input">
              Password
              <input
                id="password-input"
                type="password"
                ref={passwordRef}
                required
              />
            </label>
          </div>
          <button disabled={loading} type="submit">
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
