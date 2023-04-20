import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function SignUp() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      setError('');
      await signup(email, name, role, password);
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
        <form>
          <div>
            <label htmlFor="name-input">
              Display Name
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
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
            <label htmlFor="role-input">
              Role
              <select
                id="role-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button disabled={loading} type="button" onClick={handleSubmit}>
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
