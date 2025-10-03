import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { CreateUserData, User } from '../types';
import { auth, db } from './firebase';

export const signUp = async (email: string, password: string, userData: CreateUserData): Promise<User> => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
 
    // Update Firebase profile
    await updateProfile(firebaseUser, {
      displayName: userData.displayName
    });
    // Create user document in Firestore
    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: userData.displayName,
      photoURL: firebaseUser.photoURL || undefined,
      bio: userData.bio,
      skills: userData.skills,
      experience: userData.experience,
      location: userData.location,
      githubUrl: userData.githubUrl,
      linkedinUrl: userData.linkedinUrl,
      portfolioUrl: userData.portfolioUrl,
      availableForWork: userData.availableForWork,
      joinedAt: new Date()
    };
await setDoc(doc(db, "users", firebaseUser.uid), {
  authProvider: "local",
  email,
  joinedAt:user?.joinedAt,
  skills:userData?.skills ?? null,
  bio: userData?.bio ?? null,
  photoURL: firebaseUser?.photoURL ?? null,
   uid: firebaseUser.uid,
      displayName: userData.displayName ?? "",
      experience: userData?.experience ?? null,
      location: userData?.location ?? null,
      githubUrl: userData?.githubUrl ?? null,
      linkedinUrl: userData?.linkedinUrl ?? null,
      portfolioUrl: userData?.portfolioUrl ?? null,
      availableForWork: userData?.availableForWork ?? null,
});
    return user;
  } catch (error) {
    console.log(`${(error as Error).message}`)
    throw new Error(`Failed to create account: ${(error as Error).message}`);
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    return userDoc.data() as User;
  } catch (error) {
    throw new Error(`Failed to sign in: ${(error as Error).message}`);
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(`Failed to sign out: ${(error as Error).message}`);
  }
};

export const getUserData = async (uid: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() as User : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, userData: Partial<CreateUserData>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), userData);
  } catch (error) {
    throw new Error(`Failed to update profile: ${(error as Error).message}`);
  }
};
