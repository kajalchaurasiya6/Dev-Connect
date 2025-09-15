import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, getUserData, updateUserProfile } from '../services/auth';
import type { AuthContextType, User, CreateUserData} from '../types';
import { auth, } from '../services/firebase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const userData = await authSignIn(email, password);
    setUser(userData);
  };

  const signUp = async (email: string, password: string, userData: CreateUserData) => {
    const newUser = await authSignUp(email, password, userData);
    setUser(newUser);
  };

  const signOut = async () => {
    await authSignOut();
    setUser(null);
  };

  const updateProfile = async (userData: Partial<CreateUserData>) => {
    if (!user) throw new Error('No user logged in');
    await updateUserProfile(user.uid, userData);
    const updatedUser = await getUserData(user.uid);
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
