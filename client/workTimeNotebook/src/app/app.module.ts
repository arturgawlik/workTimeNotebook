import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedShellComponent } from './components/authorized-shell/authorized-shell.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UnauthorizedShellComponent } from './components/unauthorized-shell/unauthorized-shell.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackendModule } from './modules/backend/backend.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { reducers, initialState, effects } from './state/app.state';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { AddEditWorkTimeItemComponent } from './components/add-edit-work-time-item/add-edit-work-time-item.component';
import { WorkTimeItemListComponent } from './components/work-time-item-list/work-time-item-list.component';
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedShellComponent,
    AuthorizedShellComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    TopbarComponent,
    MainPanelComponent,
    AddEditWorkTimeItemComponent,
    WorkTimeItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BackendModule,
    StoreModule.forRoot(reducers, {initialState}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot(effects)
    // AuthModule dont need to import that module ?! - duno why this is working without that...
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
