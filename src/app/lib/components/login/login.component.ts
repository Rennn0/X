import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MainService, main_aboutUsContent } from '../../services/main.service';

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
        style({ transform: 'translateY(-10%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  aboutUsContent = main_aboutUsContent;

  constructor(private main: MainService) {}

  divToggler: boolean = false;
  toggleDiv() {
    this.divToggler = !this.divToggler;
  }
}
