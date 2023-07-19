import { Component } from '@angular/core';
import { FirestoreService, storageUpload } from 'src/lib/services/firestore.service';
import { MainService } from 'src/lib/services/main.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  myUpload!: storageUpload;

  description: string = "";
  allowedFiles = ['png', 'jpeg', 'jpg'];

  constructor(private firebase: FirestoreService, private main: MainService) { }

  ngOnInit() {
    this.main.getupload().subscribe((next) => {
      this.myUpload = next;
      // console.log(this.myUpload)
    })

    console.log("UPLOAD", this.main.getRenderingCondition())
  }

  text(event: any) {
    this.description += event.target.value;
    console.log(this.description)
  }

  fileSelected(event: any) {
    let str = event.target.value.split('.')
    if (this.allowedFiles.includes(str[1])) {
      this.firebase.uploadToStorage(event, "photos", this.description);
    } else {
      alert("Forbidden file type")
    }
  }
}
