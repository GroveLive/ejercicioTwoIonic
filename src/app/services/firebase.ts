// src/app/services/firebase.ts
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiiINs5yKlE3CZA_Z3e2X9pI2W54p5biY",
  authDomain: "crud-benedetti.firebaseapp.com",
  projectId: "crud-benedetti",
  storageBucket: "crud-benedetti.firebasestorage.app",
  messagingSenderId: "540687202551",
  appId: "1:540687202551:web:57bd021990eaa0d877bbf2",
  measurementId: "G-J4MXNP79B1"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  auth = getAuth(this.app);
  db = getFirestore(this.app);

  // ======== AUTH ========
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // ======== CRUD EXAMPLE ========
  async createItem(collectionName: string, data: any) {
    const colRef = collection(this.db, collectionName);
    return await addDoc(colRef, data);
  }

  async getItems(collectionName: string) {
    const colRef = collection(this.db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateItem(collectionName: string, id: string, data: any) {
    const docRef = doc(this.db, collectionName, id);
    return await updateDoc(docRef, data);
  }

  async deleteItem(collectionName: string, id: string) {
    const docRef = doc(this.db, collectionName, id);
    return await deleteDoc(docRef);
  }
}
