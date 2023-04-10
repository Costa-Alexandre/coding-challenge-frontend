import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';
import { auth, database } from './firebase';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updateUserDisplayName = (name) => updateProfile(auth.currentUser, { displayName: name });

  const updateUserPassword = (password) => updatePassword(auth.currentUser, password);

  const writeUserRole = (role) => {
    const { uid, email } = currentUser;
    const reference = ref(database, `users/${uid}`);
    set(reference, { role, email });
  };

  const getUserRole = async () => {
    const { uid } = currentUser;
    const reference = ref(database, `users/${uid}`);
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      const { role } = snapshot.val();
      return role;
    }
    return 'reader';
  };

  const signup = async (email, name, role, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateUserDisplayName(name);
      await writeUserRole(role);
    } catch (error) {
      // TODO: Handle error
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      return unsubscribe;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      loading,
      setCurrentUser,
      setLoading,
      login,
      logout,
      signup,
      resetPassword,
      updateUserDisplayName,
      updateUserPassword,
      getUserRole,
      writeUserRole,
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
