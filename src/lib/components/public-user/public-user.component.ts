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
    this.route.params.subscribe(params => {
      this.urlParam = '@' + params['public'];

      this.fire.readDataByID$("Users", this.urlParam).subscribe(data => {
        const retieredData = data.data();
        if (retieredData) {
          this.userData = retieredData;
        } else {
          this.userData = undefined;
        }
      })
    })
  }

}
