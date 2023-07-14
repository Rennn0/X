import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postHeader, postUrl } from './jsonBinConf.configuration';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MainService {

  url = postUrl;
  header = postHeader;

  #isLoggedIn_ = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) { }

  postReq(body: any) {
    return this.http.post(this.url, body, { headers: this.header }).subscribe(
      data => console.log(data)
    );
  }

  get isLoggedIn() {
    return this.#isLoggedIn_.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.#isLoggedIn_.next(value);
  }

}
