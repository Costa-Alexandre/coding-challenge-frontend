import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/Auth';
import { useSheets } from '../../contexts/Sheets';

function UserMenu({ message }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout, currentUser, getUserRole } = useAuth();
  const [role, setRole] = useState('');
  const { updateOrdersRow } = useSheets();
  const router = useRouter();

  const handleGetUserRole = useCallback(async () => {
    if (currentUser) {
      const userRole = await getUserRole();
      setRole(userRole);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    setError('');
    setLoading(true);
    try {
      await logout();
      router.push('/login');
    } catch {
      setError('Failed to log out');
      setLoading(false);
    }
  };

  const handleTest = () => {
    updateOrdersRow(98, { orderNumber: '2000', orderDate: '10.04.2023', product: 'Test', orderVolume: 100 });
  };

  useEffect(() => {
    handleGetUserRole();
  }, [currentUser]);

  return (
    <div>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <div>{currentUser && `Hello, ${currentUser?.displayName}`}</div>
      <div>
        <button type="button" onClick={handleLogout} disabled={loading}>
          Log out
        </button>
        <button type="button" onClick={handleTest}>
          Test Edit
        </button>
        {role === 'editor' && <Link href="/edit-data">Edit Data</Link>}
        <Link href="/update-profile">Update Profile</Link>
      </div>
    </div>
  );
}

export default UserMenu;
