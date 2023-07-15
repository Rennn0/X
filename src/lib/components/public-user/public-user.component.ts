import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-user',
  templateUrl: './public-user.component.html',
  styleUrls: ['./public-user.component.scss']
})
export class PublicUserComponent {

  private urlParam!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.urlParam = params['public'];
      console.log(this.urlParam);
    })
  }

}
