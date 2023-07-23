import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FirestoreService } from 'src/lib/services/firestore.service';

@Component({
  selector: 'app-public-user',
  templateUrl: './public-user.component.html',
  styleUrls: ['./public-user.component.scss']
})
export class PublicUserComponent {

  private urlParam!: string;
  userData: any = false;
  constructor(private route: ActivatedRoute, private fire: FirestoreService) { }


  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.urlParam = '@' + params['username'];

    //   this.fire.readDataByID$("Profiles", this.urlParam).subscribe(data => {
    //     const retrievedData = data.data();
    //     if (retrievedData) {
    //       this.userData = retrievedData;
    //     } else {
    //       this.userData = undefined;
    //     }
    //   })
    // })

  }

}
