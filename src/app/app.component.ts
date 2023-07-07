import { Component } from '@angular/core';
import { MainService } from 'src/lib/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private main: MainService) {
    main.log('Hi');
  }
}
