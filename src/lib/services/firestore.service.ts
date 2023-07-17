import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc, arrayUnion } from "firebase/firestore";
import { from, map } from 'rxjs';
import { firebaseConfiguration } from './firebaseConf.configuration';
import { StorageReference, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { MainService } from './main.service';

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


  constructor(private main: MainService) {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
    this.storageRef = ref(this.storage);
  }

  uploadToStorage(event: any, bucket: string, description?: string) {

    let upload = new storageUpload()
    upload.file = event.target.files[0];
    upload.filePath = `${bucket}/${upload.file.name}`
    upload.fileRef = ref(this.storage, upload.filePath);
    upload.description = description;

    const task = uploadBytesResumable(upload.fileRef, upload.file);
    task.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log("Upload failed", error)
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          let data = {
            url: downloadURL,
            description: description,
          };
          console.log(data)
          this.updateDocArray$("Profiles", "@Renn", "uploads", data).subscribe(() => {
            console.log("Done")
          })
        });
      }
    );
  }

  // cxrilshi amatebs chanawers random IDt
  addData$(table: string, data: any) {
    return from(addDoc(collection(this.db, table), data));
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
  setDoc$(table: string, id: string, data: any) {
    return from(setDoc(doc(this.db, table, id), { ...data, timestamp: serverTimestamp() }));
  }

  updateDocArray$(table: string, id: string, fieldValue: string, data: any) {
    return from(updateDoc(doc(this.db, table, id), {
      [fieldValue]: arrayUnion(data)
    }));
  }

  // rac aq velebi imas amatebs kide
  updateDoc$(table: string, id: string, newValue: any) {
    return from(updateDoc(doc(this.db, table, id), { ...newValue, timestamp: serverTimestamp() }));
  }

}
