import { Component } from '@angular/core';

@Component({
  selector: 'error',
  standalone: true,
  template: `
    <div class="container-fluid text-light m-5">
        <h1>Oops, wrong route...</h1>
    </div>
  `,
})
export class Error { }