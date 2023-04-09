import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function SignUp() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { signup, loading, setLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      setError('');
      await signup(
        emailRef.current.value,
        nameRef.current.value,
        roleRef.current.value,
        passwordRef.current.value,
      );
      router.push('/');
    } catch {
      setError('Failed to create an account');
      return setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h2>Sign Up</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name-input">
              Display Name
              <input id="name-input" type="text" ref={nameRef} required />
            </label>
          </div>
          <div>
            <label htmlFor="email-input">
              Email
              <input id="email-input" type="email" ref={emailRef} required />
            </label>
          </div>
          <div>
            <label htmlFor="role-input">
              Role
              <select
                id="role-input"
                ref={roleRef}
                required
                defaultValue="reader"
              >
                <option value="reader">Read Only</option>
                <option value="editor">Read and Edit</option>
              </select>
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
