import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { JwtResponse } from '../models/JwtResponse';
import { SignInForm } from '../models/SignInForm';
import { SignUpForm } from '../models/SignUpForm';

const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //API_LOCAL
  private API_SIGNUP = environment.API_LOCAL + 'signup';
  private API_SIGNIN = environment.API_LOCAL + 'signin';
  private API_CHANGE_PROFILE = environment.API_LOCAL + 'change-profile';
  private API_LIST_USER = environment.API_LOCAL + 'list-user';
  private API_PASSWORD_RESET = environment.API_LOCAL + 'password-reset';

  constructor(private _httpClient: HttpClient) {}

  //New user
  signUp(signUp: SignUpForm): Observable<any> {
    return this._httpClient.post<any>(this.API_SIGNUP, signUp);
  }

  //Login
  signIn(signIn: SignInForm): Observable<JwtResponse> {
    return this._httpClient.post<JwtResponse>(this.API_SIGNIN, signIn);
  }

  //ChangeProfile
  changeProfile(info: any): Observable<JwtResponse> {
    return this._httpClient.put<JwtResponse>(this.API_CHANGE_PROFILE, info);
  }

  //List user
  getListUser(): Observable<SignUpForm[]>{
    return this._httpClient.get<SignUpForm[]>(this.API_LIST_USER).pipe(
      map((response: any) => response)
    )
  }

  //Password-Reset
  passwordReset(info:any): Observable<JwtResponse>{
    return this._httpClient.post<JwtResponse>(this.API_PASSWORD_RESET, info);
  }

  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }

  public data: boolean;
  setData(data: boolean) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
}
