import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  #loginForm: FormGroup;
  #signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.#loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })

    this.#signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }

  getLoginForm() {
    return this.#loginForm;
  }
  getSignupForm() {
    return this.#signupForm;
  }
}

export const main_aboutUsContent = {
  title: 'About Us',
  body: `Hello friends, ^500 
  our new project serves to convey the beauty of the earth,^100
  you will find content about various attractions, ^100
  will be able to write posts and share your thoughts with other visitors.^300
  Places that you particularly like can be saved on your profile and visited later. ^300
  The site will give you other opportunities, for which you need to pass authorization first.^300
  Your feedback is important, please contact us in case of any problems.^300 Good luck!`,
  author: 'Team X Developers',
};
