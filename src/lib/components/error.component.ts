import { Component } from '@angular/core';

@Component({
    selector: 'error',
    standalone: true,
    template: `
    <div class="container-fluid">
        <h1>Oops, wrong route!</h1>
    </div>
  `,
})
export class Error { }