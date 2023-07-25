import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';
import { profileImage } from 'src/lib/assets/links';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { profile, upload } from 'src/lib/structures/profile';
import { Observable, Subscription } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private offCanvasService!: NgbOffcanvas;
  private firestore!: FirestoreService;
  private main!: MainService;

  private $profileData!: Subscription;
  private $renderingPR!: Subscription;
  profileData: profile | undefined = undefined;
  profileImage = profileImage;
  renderingProfileRecords: profile[] | undefined = undefined;

  constructor() {
    this.offCanvasService = inject(NgbOffcanvas);
    this.firestore = inject(FirestoreService);
    this.main = inject(MainService);
  }

  ngOnDestroy(): void {
    this.$profileData.unsubscribe();
    this.$renderingPR.unsubscribe();
  }

  ngOnInit() {
    this.$profileData = this.main.getProfileData().subscribe(d => {
      this.profileData = d;
    });

    this.$renderingPR = this.firestore.queryTracer$("Profiles").subscribe({
      next: (data) => {
        this.renderingProfileRecords = data
        this.renderingProfileRecords?.forEach(profile => {
          if (profile.uploads.length > 1) {
            profile.uploads = profile.uploads.sort(
              (left: upload, right: upload) => new Date(right.time).getTime() - new Date(left.time).getTime()
            )
          }
        })

        this.renderingProfileRecords = this.renderingProfileRecords?.sort((left: profile, right: profile) => {
          if (left.uploads.length && right.uploads.length) {
            return new Date(right.uploads[0].time).getTime() - new Date(left.uploads[0].time).getTime()
          } else {
            return -1;
          }
        })
      },
      error: (error) => console.log("Error", error)
    })
  }

  openChat(): void {
    const offCanvasRef = this.offCanvasService.open(ChatComponent, { backdrop: "static" });
    offCanvasRef.componentInstance.username = this.profileData?.username;
  }
}
