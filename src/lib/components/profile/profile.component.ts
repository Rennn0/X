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

  links = links;

  constructor(private firestore: FirestoreService, private main: MainService) { }

  ngOnInit() {
    this.main.getProfileData().subscribe(d => {
      this.profileData = d;
    });
    this.firestore.readData$("Profiles").subscribe((data) => {

      data.forEach(record => {
        record?.uploads.sort((left: any, right: any) => {
          return new Date(right?.time).getTime() - new Date(left?.time).getTime()
        })
      })

      this.renderingProfileRecords = data.sort((left: any, right: any) => {
        return new Date(right?.uploads[0]?.time).getTime() - new Date(left?.uploads[0]?.time).getTime()
      });

      this.main.setRenderingData(data);
      this.main.setRenderingCondition(true);
    })
  }
}
