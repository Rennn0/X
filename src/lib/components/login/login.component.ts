import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { FormsService } from 'src/lib/services/forms.service';
import { aboutUsContent } from 'src/lib/assets/content';
import { FirestoreService } from 'src/lib/services/firestore.service';
import { Router } from '@angular/router';

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
    console.log("LOGIN", this.main.getRenderingCondition())
  }

  toggleDiv(): void {
    this.divToggler = !this.divToggler;
  }

  isTitleTime(small?: boolean): void {
    small ? this.titleTimeSmall = true : this.titleTime = true;
  }

  login(): void {
    const docID = '@' + this.myLoginForm.value.username;
    this.firestore.readDataByID$("Users", docID).subscribe(response => {
      const data = response.data();
      if (data !== undefined) {
        console.log("Success");
        this.main.setLoggedIn(true);
        this.main.setProfileData(data);
        this.myLoginForm.reset();
        this.route.navigate(['profile', data['username']]);
      }
      else {
        alert("No such user");
      }
    })
  }

  signup(): void {
    const docID = '@' + this.mySignupForm.value.username;
    this.firestore.setDoc$("Users", docID, this.mySignupForm.value).subscribe(() => {
      alert("Registration succeeded");
      this.toggleDiv()
      this.mySignupForm.reset();
    });
  }
}

