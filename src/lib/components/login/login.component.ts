import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/lib/services/forms.service';
import { aboutUsContent } from 'src/lib/assets/content';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { Router } from '@angular/router';
import { profile } from 'src/lib/structures/profile';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {
  videoUrl: any;
  aboutUsContent: any;

  myLoginForm !: FormGroup;
  mySignupForm!: FormGroup;

  divToggler: boolean = false;
  titleTime: boolean = false;
  titleTimeSmall: boolean = false;
  panelOpenState = false;

  constructor
    (private main: MainService,
      private firestore: FirestoreService,
      private sanitizer: DomSanitizer,
      private forms: FormsService, private route: Router) { }

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'lib/assets/wawes.mp4'
    );
    this.aboutUsContent = aboutUsContent;
    this.myLoginForm = this.forms.getLoginForm();
    this.mySignupForm = this.forms.getSignupForm();
  }

  toggleDiv(): void {
    this.divToggler = !this.divToggler;
  }

  isTitleTime(small?: boolean): void {
    small ? this.titleTimeSmall = true : this.titleTime = true;
  }

  login(): void {
    const docID = '@' + this.myLoginForm.value.username;
    this.firestore.readDataByID$("Profiles", docID).subscribe(response => {
      const data = response.data();
      if (data !== undefined) {
        if (data['password'] === this.myLoginForm.value.password) {
          let profile: profile = {
            name: data['name'],
            lastname: data['lastname'],
            password: data['password'],
            email: data['email'],
            username: data['username'],
            uploads: []
          }
          this.main.setLoggedIn(true);
          this.main.setProfileData(profile);
          this.myLoginForm.reset();
          this.route.navigate(['profile', profile.username]);
        } else {
          alert("Wrong Password")
        }
      }
      else {
        alert("No such user");
      }
    })
  }

  signup(): void {
    const docID = '@' + this.mySignupForm.value.username;
    this.firestore.setDoc$("Profiles", docID, { ...this.mySignupForm.value, uploads: [] }).subscribe(() => {
      alert("Registration succeeded");
      this.toggleDiv()
      this.mySignupForm.reset();
    });
  }
}

