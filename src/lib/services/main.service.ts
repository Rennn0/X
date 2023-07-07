import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor() {}
  log(arg: any) {
    console.log(arg);
  }
}
