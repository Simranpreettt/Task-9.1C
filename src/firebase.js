// Firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, writeBatch, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4OKJ7SYH7isaoUe4MedUZI8F5bBp5HnM",
  authDomain: "prac1-f9a05.firebaseapp.com",
  projectId: "prac1-f9a05",
  storageBucket: "prac1-f9a05.appspot.com",
  messagingSenderId: "773771564563",
  appId: "1:773771564563:web:8817bbe3f2a5c71e1b11e6"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services

export const storage = getStorage(app);

// Google Authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters ({
  prompt:"select_account"
});
const auth = getAuth(app);

// Functions for authentication and Firestore user management
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const signOutUser = () => signOut(auth);

export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log('User Document Reference:', userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log('User Snapshot:', userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
      console.log("User successfully created in Firestore!");
    } catch (error) {
      console.log("Error in creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signinAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Batch write function for Firestore
export const addCollectioDocuments = async (collectionId, objectsToAdd) => {
  const collectionRef = collection(db, collectionId);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef); // Automatically generate document ID
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Batch write successful");
};


