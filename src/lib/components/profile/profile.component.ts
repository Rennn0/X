import { Component, ViewChild } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';
import { links, profileImage } from 'src/lib/assets/links';
import { FirestoreService } from 'src/lib/services/firestore.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @ViewChild('skeletonLoader') skeletonLoader: any;


  profileData: any;
  profileImage = profileImage;
  renderingProfileRecords!: any;

  links = links;


  constructor(private firestore: FirestoreService, private main: MainService) { }

  ngOnInit() {
    // this.main.getProfileData().subscribe(d => {
    //   this.profileData = d;
    // });
    // console.log("PROFILE", this.main.getRenderingCondition())
    if (this.main.getRenderingCondition()) {
      console.log("UKVE ARIS DATA", this.main.getRenderingCondition());

      this.main.getRenderingData().subscribe(data => {
        console.log(data);
        this.renderingProfileRecords = data;
      })

    } else {
      this.firestore.readData$("Profiles").subscribe((data) => {
        data.forEach((obj: { uploads: any; }) => {
          obj.uploads['loaded'] = false;
        });
        console.log("FIRST", data);
        this.renderingProfileRecords = data;
        this.main.setRenderingData(data);
        this.main.setRenderingCondition(true);
        console.log("PROFILE sent", this.main.getRenderingCondition())
      })
    }
  }


}
