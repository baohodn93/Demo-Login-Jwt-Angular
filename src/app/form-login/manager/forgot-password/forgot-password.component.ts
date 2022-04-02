import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordReset } from 'src/app/models/PasswordReset';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
status = 'Reset your password';
  form: any = {};
  passwordReset: PasswordReset;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  isSubmitIn = false;
  isSubmitFailed = false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  error: any = {
    message: 'Email does not exist',
  };

  success: any = {
    message: 'Email existed',
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngSubmit() {
    this.passwordReset = new PasswordReset(
    this.form.email
    );
    this._authService.forgotPassword(this.passwordReset).subscribe(
      (data) => {
      console.log('data --->', data);
      if (JSON.stringify(data) == JSON.stringify(this.error)) {
        this.isSubmitFailed = false;
        this.status = 'This Email does not exist! Please try again!';
      }
      if(JSON.stringify(data) == JSON.stringify(this.success)) {
        this.isSubmitIn = true;
        this.status = 'We have sent a reset password link to your email. Please check';
      }
    });
  }

}
