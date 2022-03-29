import { Component, OnInit, ViewChild } from '@angular/core';
import { SignUpForm } from 'src/app/models/SignUpForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {

  listUsers : SignUpForm[] = [];

  constructor(private _authService : AuthService) { }

  ngOnInit(): void {
    this.getListUser();
  }


  getListUser(){
    this._authService.getListUser().subscribe(
      data => {
        console.log('data->',data);
        this.listUsers = data;
      }
    )
  }

}
