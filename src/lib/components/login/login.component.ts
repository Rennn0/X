import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
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
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(60%)' }),
        animate('800ms ease-in-out', style({ transform: 'translateY(0%)' })),
      ]),
    ]),

    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
  ],
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
    let data;
    this.firestore.readDataByID$("Users", "user++").subscribe(resolve => {
      data = resolve.data();
      console.log(data);
      if (data !== undefined) {
        this.main.setLoggedIn(true);
        this.route.navigate(['profile'])
      }

    })
    this.myLoginForm.reset();
  }

  signup(): void {

    this.mySignupForm.reset();
  }
}

