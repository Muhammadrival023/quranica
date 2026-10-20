import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User
} from 'firebase/auth';

let firebaseConfig: any = null;
try {
  // @ts-ignore
  import('../../firebase-applet-config.json').then((module) => {
    firebaseConfig = module.default;
  }).catch(() => {});
} catch {
  // Fallback
}

const defaultFirebaseConfig = {
  apiKey: "AIzaSyCNH6EqfHOOU6yFhLKrAY1ZgGyFMD6XKQw",
  authDomain: "peppy-circuit-zwjkk.firebaseapp.com",
  projectId: "peppy-circuit-zwjkk",
  storageBucket: "peppy-circuit-zwjkk.firebasestorage.app",
  messagingSenderId: "1094885926983",
  appId: "1:1094885926983:web:840a2ae335a0ea8eeba962"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig || defaultFirebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.readonly');

let currentAccessToken: string | null = null;
try {
  currentAccessToken = localStorage.getItem('quranica_google_token') || null;
} catch {
  // Ignore
}

export function initAuth(
  onUser: (user: any, token: string | null) => void,
  onSignOut: () => void
): () => void {
  return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const userObj = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Pengguna'),
        photoURL: firebaseUser.photoURL || ''
      };
      onUser(userObj, currentAccessToken);
    } else {
      currentAccessToken = null;
      try {
        localStorage.removeItem('quranica_google_token');
      } catch {}
      onSignOut();
    }
  });
}

export async function googleSignIn(): Promise<{ user: any; accessToken: string } | null> {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || (await result.user.getIdToken());
    currentAccessToken = token;
    if (token) {
      try {
        localStorage.setItem('quranica_google_token', token);
      } catch {}
    }
    const user = {
      uid: result.user.uid,
      email: result.user.email || '',
      displayName: result.user.displayName || (result.user.email ? result.user.email.split('@')[0] : 'Pengguna'),
      photoURL: result.user.photoURL || ''
    };
    return { user, accessToken: token };
  } catch (error: any) {
    console.error("Google sign in error:", error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  currentAccessToken = null;
  try {
    localStorage.removeItem('quranica_google_token');
  } catch {}
  await signOut(auth);
}

export function getAccessToken(): string | null {
  return currentAccessToken;
}
