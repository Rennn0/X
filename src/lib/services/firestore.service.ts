import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { from } from 'rxjs';
import { firebaseConfiguration } from './firebaseConf.configuration';

@Injectable({
  providedIn: 'root'
}) export class FirestoreService {
  firebaseConfig = firebaseConfiguration;
  app: any;
  db: any;


  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  // cxrilshi amatebs chanawers random IDt
  addData$(table: string, data: any) {
    return from(addDoc(collection(this.db, table), data));
  }

  // cxrilidan mogaq mtliani data
  readData$(table: string) {
    return from(getDocs(collection(this.db, table)));
  }

  //cxrilidan IDt wamoigebs chanawers
  readDataByID$(table: string, id: string) {
    return from(getDoc(doc(this.db, table, id)));
  }

  // konkretul IDs adzlev da ise qmni docs
  setDoc$(table: string, id: string, data: any) {
    return from(setDoc(doc(this.db, table, id), data));
  }

  // rac aq velebi imas amatebs kide
  updateDoc$(table: string, id: string, newValue: any) {
    return from(updateDoc(doc(this.db, table, id), { ...newValue, timestamp: serverTimestamp() }));
  }

}
