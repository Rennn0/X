import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/lib/services/main.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData: any;
  img1 = "https://upload.wikimedia.org/wikipedia/commons/d/d3/Microsoft_Account.svg";
  defImg = "https://businance.com/wp-content/uploads/2019/12/2378649-775x400.jpg";
  constructor(private route: ActivatedRoute, private router: Router, private main: MainService) { }

  ngOnInit() {
    // this.main.getProfileData().subscribe(d => {
    //   this.profileData = d;
    // });
  }
}
