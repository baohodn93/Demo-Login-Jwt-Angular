import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpForm } from 'src/app/models/SignUpForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  form: any = {};
  status = 'Please fill in the form to register!';
  email = new FormControl('', [Validators.required, Validators.email]);
  signUpForm: SignUpForm;
  isCreateIn = false;
  isCreateFailed = false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  error1: any = {
    message: 'Username existed!',
  };

  error2: any = {
    message: 'Email existed!',
  };

  successfully: any = {
    message: 'Create user success!',
  };

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );
    this._authService.signUp(this.signUpForm).subscribe(
      (data) => {
        console.log('data --->', data);
        if (JSON.stringify(data) == JSON.stringify(this.error1)) {
          this.isCreateFailed = false;
          this.status = 'The username existed! Please try again!';
        }
        if (JSON.stringify(data) == JSON.stringify(this.error2)) {
          this.isCreateFailed = false;
          this.status = 'The email existed! Please try again!';
        }
        if (JSON.stringify(data) == JSON.stringify(this.successfully)) {
          // this.isCreateFailed = true;
          // this.status = 'Created Account Success';
          this._router.navigate(['']).then(() => {
            window.location.reload();
          });
        }
      }
    );
  }
}
