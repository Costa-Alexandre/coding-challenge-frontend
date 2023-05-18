import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/Auth';
import { useSheets } from '../../contexts/Sheets';
import { useQuery } from '../../hooks';

function UserMenu({ message }) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout, currentUser, getUserRole } = useAuth();
  const [role, setRole] = useState('');
  const { updateOrdersRow } = useSheets();
  const { year, month, router } = useQuery();

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

  const handleTest = async () => {
    await updateOrdersRow(98, { orderNumber: '2000', orderDate: `10.${month}.${year}`, product: 'Test added by Test Edit button', orderVolume: 100 });
    router.replace(`/${year}/${month}`);
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
        {role === 'editor' && (<button type="button" onClick={handleTest}>
          Test Edit
        </button>)}
        <Link href="/update-profile">Update Profile</Link>
      </div>
    </div>
  );
}

export default UserMenu;
