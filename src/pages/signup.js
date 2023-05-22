import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

import styles from './styles/login.module.css';

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
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>Sign Up</h2>
        {error && <div>{error}</div>}
        <form>
          <label htmlFor="name-input">
            <div>Display Name</div>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="email-input">
            <div>Email</div>
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="role-input">
            <div>Role</div>
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
          <label htmlFor="password-input">
            <div>Password</div>
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label htmlFor="confirm-password-input">
            <div>Confirm Password</div>
            <input
              id="confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button disabled={loading} type="button" onClick={handleSubmit}>
            <div>Sign Up</div>
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <div>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
          <div>Already have an account?</div>
          <Link href="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
