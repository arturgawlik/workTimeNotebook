import { Component, OnInit } from '@angular/core';
import { LoginBackendService } from 'src/app/modules/backend/services/login/login-backend.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  communicat = '';

  loginForm: FormGroup;

  constructor(private loginBackendService: LoginBackendService, private fb: FormBuilder,
    private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  submitForm() {
    this.communicat = '';
    if (this.loginForm.valid) {
      this.loginBackendService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
        .subscribe(
          r => {
            console.log(r);
            this.authService.setToken(r.access_token);
            this.router.navigate(['']);
          },
          err => {
            if (err.status === 401) {
              this.communicat = 'Wrong email or password!';
            }
          });
    }
  }

}
