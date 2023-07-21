import { Component } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';
import { links, profileImage } from 'src/lib/assets/links';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { profile, upload } from 'src/lib/structures/profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData: profile | undefined = undefined;
  profileImage = profileImage;
  renderingProfileRecords: profile[] | undefined = undefined;

  // links = links;

  constructor(private firestore: FirestoreService, private main: MainService) { }

  ngOnInit() {
    this.main.getProfileData().subscribe(d => {
      this.profileData = d;
    });
    this.firestore.readData$("Profiles").subscribe((data: profile[]) => {

      this.renderingProfileRecords = data

      this.renderingProfileRecords.forEach(profile =>
        profile.uploads = profile.uploads.sort((left: upload, right: upload) => new Date(right.time).getTime() - new Date(left.time).getTime())
      )

      this.renderingProfileRecords = this.renderingProfileRecords.sort((left: profile, right: profile) => new Date(right.uploads[0].time).getTime() - new Date(left.uploads[0].time).getTime())

      console.log(this.renderingProfileRecords)

    })
  }
}
