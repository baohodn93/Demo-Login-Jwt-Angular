import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeProfileForm } from 'src/app/models/ChangeProfileForm';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-infor',
  templateUrl: './user-infor.component.html',
  styleUrls: ['./user-infor.component.css'],
})
export class UserInforComponent implements OnInit {
  form: any = {};
  status = 'Please fill in the form to change profile!';
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  error1: any = {
    message: 'Username existed',
  };

  error2: any = {
    message: 'Email existed',
  };

  success: any = {
    message: 'Update Successfully!',
  };
  isLoggedIn = false;
  isUpdatedIn = false;
  isUpdateFailed = false;
  roles: string[] = [];
  name: string;

  changeProfileForm: ChangeProfileForm;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getRoles();
      this.name = this.tokenService.getName();
    }
  }

  ngSubmit() {
    this.changeProfileForm = new ChangeProfileForm(
      this.form.name,
      this.form.username,
      this.form.email
    )
    this._authService.changeProfile(this.changeProfileForm).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        console.log('Updated Susscessfully');
        this.status = 'Change Profile Success!';
        this.tokenService.setName(this.form.name);
        // this.tokenService.logOut();
      }
    })
  }
}
