import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { MainService } from 'src/lib/services/main.service';
import { profile } from 'src/lib/structures/profile';

const enum errorStates {
  wrongExtension = 0,
  exceedesLimit = 1,
  noDescription = 2,
  notInitialized = 3,
  noFileChosen = 4,
  allOK = 9
};


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  private firebase: FirestoreService;
  private main: MainService;

  $profileData!: Subscription;
  $uploadProgress!: Subscription;

  profileData: profile | undefined = undefined;
  chosenFile: any;

  description: string = "";
  username: string | undefined = "";
  progressCount: number | null = null;

  errorState: errorStates = errorStates.notInitialized;
  allowedFiles = ['png', 'jpeg', 'jpg'];
  warningOptions =
    [
      "Forbidden file extension",
      "File exceedes limited size of 1mb",
      "Provide some description",
      "Initialize values", "No file chosen"
    ];
  warningText = "";

  constructor() {
    this.firebase = inject(FirestoreService);
    this.main = inject(MainService)
  }
  ngOnInit(): void {
    this.$profileData = this.main.getProfileData().subscribe(pd => this.profileData = pd);
    this.username = this.profileData?.username;
  }
  ngOnDestroy(): void {
    this.$profileData.unsubscribe();
  }

  errorChecking() {
    if (!this.chosenFile) {
      this.errorState = errorStates.noFileChosen;
      return;
    }
    const uploadSize = this.chosenFile.target.files[0].size;
    const str = this.chosenFile.target.value.split('.');

    if (this.description === "") {
      this.errorState = errorStates.noDescription;
      return;
    }
    if (!this.allowedFiles.includes(str[str.length - 1].toLowerCase())) {
      this.errorState = errorStates.wrongExtension;
      return
    }
    if (uploadSize > 1000000) {
      this.errorState = errorStates.exceedesLimit;
      return
    }

    this.errorState = errorStates.allOK
  }

  fileSelected(event: any): void {
    this.chosenFile = event;
  }

  submit(): void {

    this.errorChecking();

    if (this.errorState !== errorStates.allOK) {
      this.warningText = this.warningOptions[this.errorState];
      setTimeout(() => {
        this.warningText = "";
      }, 5000);
      return;
    }

    this.$uploadProgress = this.firebase.getProgress$().subscribe(progress => this.progressCount = progress);
    console.log(this.profileData?.username, this.description)
    this.firebase.uploadToStorage(this.chosenFile, "photos", '@' + this.profileData?.username, this.description);
  }

}
