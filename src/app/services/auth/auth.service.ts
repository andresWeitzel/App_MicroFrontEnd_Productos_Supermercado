import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUsuarioDto } from 'src/app/models/LoginUsuarioDto';
import { SigninUsuarioDto } from 'src/app/models/SigninUsuarioDto';
import { JwtDto } from 'src/app/models/JwtDto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_URL = 'http://localhost:8098/auth';

  constructor(private httpClient : HttpClient) {  }



  //================= SIGNIN ===============
 public signin(signinUsuario : SigninUsuarioDto): Observable<any>{
  return this.httpClient.post<any>(this.AUTH_URL + 'signin' , signinUsuario);
 }
//================= LOGIN ===============
public login(loginUsuario : LoginUsuarioDto) : Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(this.AUTH_URL + 'login',loginUsuario);
}

}
