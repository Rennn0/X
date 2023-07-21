import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';
import { profileImage } from 'src/lib/assets/links';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { profile, upload } from 'src/lib/structures/profile';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private $profileData!: Subscription;
  private $renderingPR!: Subscription;
  profileData: profile | undefined = undefined;
  profileImage = profileImage;
  renderingProfileRecords: profile[] | undefined = undefined;

  constructor(private firestore: FirestoreService, private main: MainService) { }

  ngOnDestroy(): void {
    this.$profileData.unsubscribe();
    this.$renderingPR.unsubscribe();
  }

  ngOnInit() {
    this.$profileData = this.main.getProfileData().subscribe(d => {
      this.profileData = d;
    });

    this.$renderingPR = this.firestore.readData$("Profiles").subscribe((data: profile[]) => {

      this.renderingProfileRecords = data

      this.renderingProfileRecords.forEach(profile => {
        if (profile.uploads.length > 1) {
          profile.uploads = profile.uploads.sort(
            (left: upload, right: upload) => new Date(right.time).getTime() - new Date(left.time).getTime()
          )
        }
      })

      this.renderingProfileRecords = this.renderingProfileRecords.sort((left: profile, right: profile) => {
        if (left.uploads.length && right.uploads.length) {
          return new Date(right.uploads[0].time).getTime() - new Date(left.uploads[0].time).getTime()
        } else {
          return -1;
        }
      })
    })
  }
}
