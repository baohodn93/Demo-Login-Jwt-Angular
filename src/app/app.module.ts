import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {httpInterceptorProviders} from './services/auth.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './shared/nav-footer/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/nav-footer/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './form-login/register/register.component';
import { FontSizeComponent } from './shared/font-size/font-size.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './form-login/login/login.component';
import { UserInfoComponent } from './form-login/user-info/user-info.component';
import { ChangePasswordComponent } from './form-login/manager/change-password/change-password.component';
import { ChangeAvatarComponent } from './form-login/manager/change-avatar/change-avatar.component';
import { ChangeRoleComponent } from './form-login/manager/change-role/change-role.component';
import { ResetPasswordComponent } from './form-login/manager/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  { path: 'change-profile', component: UserInfoComponent, data: {title: 'Change-Profile'}},
  { path: 'change-avatar', component: ChangeAvatarComponent, data: {title: 'Change-Avatar'}},
  { path: 'change-password', component: ChangePasswordComponent, data: {title: 'Change-Password'}},
  { path: 'change-role', component: ChangeRoleComponent, data: {title: 'Change-Role'}},
  { path: 'password-reset', component: ResetPasswordComponent, data: {title: 'Password-Reset'}},
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    FontSizeComponent,
    LoginComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    ChangeAvatarComponent,
    ChangeRoleComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
