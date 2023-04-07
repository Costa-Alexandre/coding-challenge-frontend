import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/Auth/auth';

function UserMenu() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const { message } = router.query;

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await logout();
      router.push('/login');
    } catch {
      setError('Failed to log out');
    }
    setLoading(false);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <div>
        <button type="button" onClick={handleLogout} disabled={loading}>
          Log out
        </button>
        <Link href="/update-profile">Update Profile</Link>
      </div>
    </div>
  );
}

export default UserMenu;
