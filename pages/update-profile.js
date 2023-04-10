import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/Auth';

export default function UpdateProfile() {
  const {
    currentUser,
    updateUserDisplayName,
    updateUserPassword,
    writeUserRole,
    getUserRole,
  } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const getRole = async () => {
    const { uid } = currentUser || '';
    const role = await getUserRole(uid);
    setUserRole(role || '');
    setSelectedRole(role || 'reader');
  };

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
    getRole();
  }, [currentUser]);

  // eslint-disable-next-line consistent-return
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const promises = [];
      setError('');

      if (name !== currentUser.displayName) {
        promises.push(updateUserDisplayName(name));
      }

      if (selectedRole !== userRole) {
        promises.push(writeUserRole(selectedRole));
      }

      if (password) {
        promises.push(updateUserPassword(password));
      }

      await Promise.all(promises);
      router.push(
        `/${promises.length !== 0 ? '?message=Profile updated' : ''}`,
      );
    } catch {
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
        <form>
          <div>
            <label htmlFor="name-input">
              Name
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirm-password-input">
              Confirm Password
              <input
                id="confirm-password-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <button disabled={loading} type="button" onClick={handleSubmit}>
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
