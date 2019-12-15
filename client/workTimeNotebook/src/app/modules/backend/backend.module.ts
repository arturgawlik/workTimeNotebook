import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterBackendService } from './services/register/register-backend.service';
import { LoginBackendService } from './services/login/login-backend.service';
import { WorkTimeNoteBackendService } from './services/workTimeNote/workTimeNote-backend.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RegisterBackendService,
    LoginBackendService,
    WorkTimeNoteBackendService
  ]
})
export class BackendModule { }
