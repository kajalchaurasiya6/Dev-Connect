export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  skills: string[];
  experience: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availableForWork: boolean;
  joinedAt: Date;
}

export interface CreateUserData {
  email: string;
  displayName: string;
  bio?: string;
  skills: string[];
  experience: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availableForWork: boolean;
}
