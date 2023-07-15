import { Component } from '@angular/core';

@Component({
    selector: 'loading',
    standalone: true,
    template: `
      <div class="application-loading-container">
        <div
          class="spinner-grow"
          style="width: 3rem; height: 3rem"
          role="status"
        ></div>
      </div>
  `,
})
export class Loading { }