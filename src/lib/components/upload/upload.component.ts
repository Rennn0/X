import { Component } from '@angular/core';
import { FirestoreService, storageUpload } from 'src/lib/services/firestore.service';
import { MainService } from 'src/lib/services/main.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  myAvatar!: storageUpload;

  allowedFiles = ['png', 'jpeg', 'jpg'];

  constructor(private firebase: FirestoreService, private main: MainService) { }

  ngOnInit() {
    this.main.getAvatar().subscribe((next) => {
      this.myAvatar = next;
    })
  }


  fileSelected(event: any) {
    let str = event.target.value.split('.')
    if (this.allowedFiles.includes(str[1])) {
      this.firebase.uploadToStorage(event, "avatars");
    } else {
      alert("Forbidden file type")
    }
  }
}
