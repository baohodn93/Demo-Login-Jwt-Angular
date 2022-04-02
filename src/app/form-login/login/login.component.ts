import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInForm } from 'src/app/models/SignInForm';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  status = 'Please login your account!';
  form: any = {};
  signInForm: SignInForm;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  roles: string[] = [];
  name: string;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getRoles();
      this.name = this.tokenService.getName();
    }
  }
  ngSubmit() {
    this.signInForm = new SignInForm(this.form.username, this.form.password);

    console.log('signInForm', this.signInForm);
    this.authService.signIn(this.signInForm).subscribe(
      (data) => {
        console.log('data', data);
        if (data.token != undefined) {
          this.tokenService.setToken(data.token);
          this.tokenService.setName(data.name);
          // this.tokenService.setUsername(data.username);
          this.name = this.tokenService.getName();

          this.tokenService.setRoles(data.roles);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        } else {
          this.isLoggedIn = false;
          this.isLoginFailed = true;
          console.log('loginFailed', this.isLoginFailed);
          console.log('isLoggedIn', this.isLoggedIn);
          this.status = 'Login Failed! Please try again!';
        }
        // this.roles = this.tokenService.getRoles();
      },
      (error) => {
        console.log('error', error);
        this.status = error.error().message;
        this.isLoginFailed = true;
      }
    );
  }
  ngForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
}
