/**
 * Firebase is ~107 KB gzipped and almost nothing on a first visit needs it
 * (sign-in, reviews and the newsletter box). Importing it statically put it in
 * the modulepreload list of every page, including blog posts and the privacy
 * policy. Everything now goes through these loaders, so the chunk is fetched
 * only when a feature actually asks for it.
 */
type FirebaseApp = typeof import('../firebase');
type FirebaseAuth = typeof import('firebase/auth');
type FirebaseStore = typeof import('firebase/firestore');

let appP: Promise<FirebaseApp> | null = null;
let authP: Promise<FirebaseAuth> | null = null;
let storeP: Promise<FirebaseStore> | null = null;

/** Resolved copies, so a click handler can use them synchronously (a popup
 *  has to open inside the user gesture, and an `await` on a pending import
 *  would lose it). Filled in as soon as each load finishes. */
export const loaded: { app?: FirebaseApp; auth?: FirebaseAuth; store?: FirebaseStore } = {};

export const loadFirebaseApp = () =>
  (appP ??= import('../firebase').then((m) => (loaded.app = m)));
export const loadFirebaseAuth = () =>
  (authP ??= import('firebase/auth').then((m) => (loaded.auth = m)));
export const loadFirestore = () =>
  (storeP ??= import('firebase/firestore').then((m) => (loaded.store = m)));
