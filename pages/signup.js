import React, { useContext, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/Auth/auth';

export default function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      router.push('/');
    } catch {
      setError('Failed to create an account');
    }
    return setLoading(false);
  };

  return (
    <main>
      <section>
        <h2>Sign Up</h2>
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
          <div>
            <label htmlFor="confirm-password-input">
              Password
              <input
                id="confirm-password-input"
                type="password"
                ref={confirmPasswordRef}
                required
              />
            </label>
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
      </section>
      <section>
        <p>Already have an account?</p>
        <Link href="/login">Log In</Link>
      </section>
    </main>
  );
}
