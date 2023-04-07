import React, { useState, useEffect, useMemo, createContext } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updateUserEmail = (email) => updateEmail(auth.currentUser, email);

  const updateUserPassword = (password) => updatePassword(auth.currentUser, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      login,
      currentUser,
      logout,
      signup,
      resetPassword,
      updateUserEmail,
      updateUserPassword,
    }),
    [currentUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
