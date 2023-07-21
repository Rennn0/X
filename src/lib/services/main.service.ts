import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { postHeader, postUrl } from './jsonBinConf.configuration';
import { BehaviorSubject, from } from 'rxjs';
import { FirestoreService, storageUpload } from './firestore.service';


@Injectable({
  providedIn: 'root',
})
export class MainService {

  url = postUrl;
  header = postHeader;

  #isLoggedIn_ = new BehaviorSubject<any>(false);
  #profileData = new BehaviorSubject<any>({});
  #upload = new BehaviorSubject<storageUpload>(new storageUpload);
  #renderingData = new BehaviorSubject<any>(undefined);
  renderingCondition = false;
  constructor(private http: HttpClient) { }


  setRenderingData(data: any) {
    this.#renderingData.next(data);
    this.renderingCondition = true;
  }

  getRenderingData() {
    return this.#renderingData.asObservable();
  }

  getRenderingCondition() {
    return this.renderingCondition;
  }

  setRenderingCondition(value: boolean) {
    this.renderingCondition = value;
  }

  getupload() {
    return from(this.#upload);
  }

  setupload(newupload: storageUpload) {
    this.#upload.next(newupload);
  }

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

  getProfileData() {
    return this.#profileData.asObservable();
  }


  setProfileData(newValue: any) {
    this.#profileData.next(newValue);
  }
}
