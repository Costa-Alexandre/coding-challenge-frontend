import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function UpdateProfile() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const {
    currentUser,
    updateUserDisplayName,
    updateUserPassword,
    loading,
    setLoading,
    writeUserRole,
    getUserRole,
  } = useAuth();
  const [userRole, setUserRole] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const getRole = async () => {
    const data = await getUserRole(currentUser.uid);
    setSelectedRole(data.role || 'reader');
    setUserRole(data.role);
  };

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
    getRole();
  }, [currentUser]);

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

      if (nameRef.current.value !== currentUser.displayName) {
        promises.push(updateUserDisplayName(nameRef.current.value));
      }

      if (roleRef.current.value !== userRole) {
        promises.push(writeUserRole(roleRef.current.value));
      }

      if (passwordRef.current.value) {
        promises.push(updateUserPassword(passwordRef.current.value));
      }

      await Promise.all(promises);
      router.push(
        `/${promises.length !== 0 ? '?message=Profile updated' : ''}`,
      );
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
            <label htmlFor="name-input">
              Name
              <input
                id="name-input"
                type="text"
                ref={nameRef}
                defaultValue={currentUser?.displayName}
              />
            </label>
          </div>
          <div>
            <label htmlFor="role-input">
              Role
              {selectedRole && (
                <select
                  id="role-input"
                  ref={roleRef}
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                  }}
                >
                  <option value="reader">Read Only</option>
                  <option value="editor">Read and Edit</option>
                </select>
              )}
            </label>
          </div>
          Leave blank to keep the same
          <div>
            <label htmlFor="password-input">
              Password
              <input id="password-input" type="password" ref={passwordRef} />
            </label>
          </div>
          <div>
            <label htmlFor="confirm-password-input">
              Confirm Password
              <input
                id="confirm-password-input"
                type="password"
                ref={confirmPasswordRef}
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
