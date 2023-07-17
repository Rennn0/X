import { Component } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';
import { links, profileImage } from 'src/lib/assets/links';
import { FirestoreService } from 'src/lib/services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileData: any;
  profileImage = profileImage;
  renderingProfileRecords!: any;
  constructor(private firestore: FirestoreService, private main: MainService) { }

  ngOnInit() {
    // this.main.getProfileData().subscribe(d => {
    //   this.profileData = d;
    // });

    this.firestore.readData$("Profiles").subscribe((data) => {
      console.log(data);
      this.renderingProfileRecords = data;
    })

  }
}
