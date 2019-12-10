import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterBackendService } from 'src/app/modules/backend/services/register/register-backend.service';
import { validateEmailNotTaken, validatePassword } from 'src/app/utils/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerBackendService: RegisterBackendService, private router: Router) {

  }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email], [validateEmailNotTaken(this.registerBackendService)]],
      'password': this.fb.group({
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'passwordSecond': ['']
      }, { validators: validatePassword })
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.registerBackendService.register(this.registerForm.get('email').value, this.registerForm.get('password.password').value)
        .subscribe(r => {
          this.router.navigate(['/login']);
        });
    }
  }

}
