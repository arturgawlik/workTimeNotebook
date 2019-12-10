import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterBackendService } from 'src/app/modules/backend/services/register/register-backend.service';
import { validateEmailNotTaken, validatePassword } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerBackendService: RegisterBackendService) {

  }

  ngOnInit() {
    this.initRegisterForm();
    // this.registerForm.get('email').inva
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email], [validateEmailNotTaken(this.registerBackendService)]],
      'password': this.fb.group({
        'password': ['', Validators.required],
        'passwordSecond': ['', Validators.required]
      }, { validators: validatePassword })
    });
  }

}
