import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";
import { auth } from "./firebase-setup";

export async function getUserLocation() {
  try {
    const docSnap = await getDoc(doc(firestore, "users", auth.currentUser.uid));

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.log("get user location ", err);
  }
}

export async function saveUserLocation(location) {
  try {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), location);
  } catch (err) {
    console.log("save user location ", err);
  }
}

export async function writeToDB(goal) {
  try {
    const docRef = await addDoc(collection(firestore, "goals"), {
      ...goal,
      user: auth.currentUser.uid,
    });
    console.log(docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(firestore, "goals", id));
  } catch (err) {
    console.log(err);
  }
}