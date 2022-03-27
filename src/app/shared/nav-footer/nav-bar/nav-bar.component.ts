import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  name: string;
  checkLogin = false;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.checkLogin = true;
      this.name = this.tokenService.getName();
    }
  }

  ngLogout(){
    window.sessionStorage.clear();
    window.location.reload;
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

}
