import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function UpdateProfile() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const { currentUser, updateUserEmail, updateUserPassword, loading, setLoading } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const promises = [];
      setError('');

      if (emailRef.current.value && emailRef.current.value !== currentUser.email) {
        promises.push(updateUserEmail(emailRef.current.value));
      }

      if (passwordRef.current.value) {
        promises.push(updateUserPassword(passwordRef.current.value));
      }

      await Promise.all(promises);
      router.push(`/${promises.length !== 0 ? '?message=Profile updated' : ''}`);
    } catch (err) {
      // TODO: log error
      setError('Failed to update profile');
      return setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h2>Update Profile</h2>
        <h3>Leave blank to keep the same</h3>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-input">
              Email
              <input
                id="email-input"
                type="email"
                ref={emailRef}
                placeholder={currentUser?.email}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password-input">
              Password
              <input
                id="password-input"
                type="password"
                ref={passwordRef}
                placeholder="*******"
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirm-password-input">
              Confirm Password
              <input
                id="confirm-password-input"
                type="password"
                ref={confirmPasswordRef}
                placeholder="*******"
              />
            </label>
          </div>
          <button disabled={loading} type="submit">
            Update
          </button>
          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
        </form>
      </section>
    </main>
  );
}
