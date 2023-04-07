import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/Auth/auth';

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      router.push({
        pathname: '/login',
        query: { message: 'Password reset email sent! Check your inbox' },
      });
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
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
