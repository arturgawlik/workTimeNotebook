import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';
import { AuthorizedGuard } from './guards/authorized.guard';
import { UnauthorizedGuard } from './guards/unauthorized.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component'
import { MainPanelComponent } from './components/main-panel/main-panel.component';


const routes: Routes = [
  {
    path: '', component: AuthorizedShellComponent, canActivate: [AuthorizedGuard], children: [
      { path: '', component: MainPanelComponent}
    ]
  },
  {
    path: '', component: UnauthorizedShellComponent, canActivate: [UnauthorizedGuard], children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
