import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [`mat-icon {}`]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    })
  }

  login() { }
}
