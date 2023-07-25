import { Injectable, inject } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, doc, deleteDoc, setDoc, updateDoc, getDoc, arrayUnion, query, onSnapshot, DocumentData } from "firebase/firestore";
import { BehaviorSubject, Observable, Subscription, from, map } from 'rxjs';
import { firebaseConfiguration } from './firebaseConf.configuration';
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { MainService } from './main.service';
import { profile, upload } from '../structures/profile';

import { Location } from '@angular/common';

export class storageUpload {
  file!: any;
  filePath!: string;
  fileRef!: StorageReference;
  downloadURL!: string;
  description?: string
}


@Injectable({
  providedIn: 'root'
}) export class FirestoreService {
  firebaseConfig = firebaseConfiguration;
  app: any;
  db: any;
  storage: any;
  storageRef: any;

  private router !: Location;
  private progress$ = new BehaviorSubject<number | null>(null)


  constructor(private main: MainService) {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.storageRef = ref(this.storage);
    this.router = inject(Location)
  }

  getProgress$() {
    return from(this.progress$)
  }

  queryTracer$(queryName: string): Observable<any> {
    const messageQuery = query(collection(this.db, queryName));

    return new Observable<any>((observer) => {
      const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
        let messages: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });

        observer.next(messages)
      }, (error) => {
        observer.error(error);
      });

      return () => unsubscribe();
    });
  }


  uploadToStorage(event: any, bucket: string, username: string, description: string) {
    let upload = new storageUpload()
    upload.file = event.target.files[0];
    upload.filePath = `${bucket}/${upload.file.name}`
    upload.fileRef = ref(this.storage, upload.filePath);
    upload.description = description;

    const task = uploadBytesResumable(upload.fileRef, upload.file);
    task.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.progress$.next(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log("Upload failed", error)
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          let data: upload = {
            url: downloadURL,
            description: description,
            time: new Date().toUTCString()
          };
          this.progress$.next(null);
          this.updateDocArray$("Profiles", username, "uploads", data).subscribe(() => {
            this.router.back()
          })
        });
      }
    );
  }

  // cxrilshi amatebs chanawers random IDt
  addData$(table: string, data: any) {
    addDoc(collection(this.db, table), data);
  }

  // cxrilidan mogaq mtliani data
  readData$(table: string) {
    return from(getDocs(collection(this.db, table))).pipe(map((qSnap: { docs: any[]; }) => qSnap.docs.map(doc => doc.data())));
  }

  //cxrilidan IDt wamoigebs chanawers
  readDataByID$(table: string, id: string) {
    return from(getDoc(doc(this.db, table, id)));
  }

  // konkretul IDs adzlev da ise qmni docs
  setDoc$(table: string, id: string, data: profile) {
    return from(setDoc(doc(this.db, table, id), data));
  }

  updateDocArray$(table: string, id: string, fieldValue: string, data: upload) {
    console.log(data)
    return from(updateDoc(doc(this.db, table, id), {
      [fieldValue]: arrayUnion(data)
    }));
  }

  // rac aq velebi imas amatebs kide
  updateDoc$(table: string, id: string, newValue: any) {
    updateDoc(doc(this.db, table, id), newValue);
  }

  async deleteAllRecordsFromMessages(): Promise<void> {
    const collectionRef = collection(this.db, "Messages");
    const querySnap = await getDocs(collectionRef);

    const deletePromises: Promise<void>[] = [];

    querySnap.forEach((docSnap) => {
      const docRef = doc(collectionRef, docSnap.id);
      const deletePromise = deleteDoc(docRef);
      deletePromises.push(deletePromise);
    })

    await Promise.all(deletePromises);
  }

}
