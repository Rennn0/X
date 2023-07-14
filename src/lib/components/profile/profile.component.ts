import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MainService } from 'src/lib/services/main.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData: any;

  constructor(private route: ActivatedRoute, private router: Router, private main: MainService) { }

  ngOnInit() {
    this.main.getProfileData().subscribe(d => {
      this.profileData = d;
    });
  }
}
