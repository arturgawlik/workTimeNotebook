import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackendModule } from './modules/backend/backend.module';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedShellComponent,
    AuthorizedShellComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BackendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
