import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '.';

function AuthRoute({ children }) {
  const router = useRouter();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return loading ? <div>Loading...</div> : <>{children}</>;
}

export default AuthRoute;
