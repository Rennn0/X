import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, doc } from "firebase/firestore";
import { from } from 'rxjs';
import { firebaseConfiguration } from './firebase.configuration';

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


  addData(table: string = "Users", data: any) {
    from(addDoc(collection(this.db, table), data)).subscribe({
      next: docRef => console.log(table, docRef.id),
      error: err => console.log(`Error ${err}`)
    });
  }

  readData(table: string = "Users") {
    from(getDocs(collection(this.db, table))).subscribe({
      next: query => query.forEach(doc => console.log(table, doc.id, doc.data())),
      error: err => console.log(err)
    });
  }

}
