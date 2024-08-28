// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

export interface UserAccount {
  uid: string;
  username: string;
  displayName: string | null;
  picture: string | null;
  email: string | null;
  role: 'student' | 'professor' | 'community' | 'admin' | 'superadmin';
  passwordHash: string | null;
  contributorId: string;
  professorId: number | null;
  createdAt: Date;
  updatedAt: Date;
  professorCourses: string[];
  professorTutorials: number[];
  professorShortBio: {
    [x: string]: string;
  };
  professorTags: string[];
  professorLightningAddress: string;
}

export interface UserDetails {
  uid: string;
  username: string;
  displayName: string | null;
  picture: string | null;
  email: string | null;
  contributorId: string;
}

export interface UserRoles {
  uid: string;
  username: string;
  displayName: string | null;
  email: string | null;
  contributorId: string;
  role: 'student' | 'professor' | 'community' | 'admin' | 'superadmin';
  professorId: number | null;
  professorName?: string | undefined;
}

export interface UsersLud4PublicKey {
  id: string;
  uid: string;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
}
