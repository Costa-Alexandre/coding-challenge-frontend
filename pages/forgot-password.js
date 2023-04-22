import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const { resetPassword, loading, setLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError('');
      await resetPassword(emailRef.current.value);
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
    <main>
      <section>
        <h2>Password Reset</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-input">
              Email
              <input id="email-input" type="email" ref={emailRef} required />
            </label>
          </div>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div>
          <Link href="/login">Log in</Link>
        </div>
      </section>
      <section>
        <p>Need an account?</p>
        <Link href="/signup">Sign Up</Link>
      </section>
    </main>
  );
}
