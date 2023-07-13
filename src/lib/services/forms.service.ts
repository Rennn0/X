import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  #loginForm: FormGroup;
  #signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.#loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })

    this.#signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
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
