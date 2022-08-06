import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginUsuarioDto } from 'src/app/models/LoginUsuarioDto';
import { SigninUsuarioDto } from 'src/app/models/SigninUsuarioDto';
import { JwtDto } from 'src/app/models/JwtDto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlAuthApi = environment.URL_AUTH_API;


  constructor(private httpClient : HttpClient) {  }

   //================= SIGNIN ===============
  public signin(signinUsuario : SigninUsuarioDto): Observable<SigninUsuarioDto>{
    return this.httpClient.post<SigninUsuarioDto>(this.urlAuthApi + 'signin' , signinUsuario);
   }



  //================= LOGIN ===============
  public login(loginUsuario : LoginUsuarioDto) : Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.urlAuthApi + 'login',loginUsuario);
  }


  //================= REFRESH_TOKEN ===============
public refreshToken(jwtDto : JwtDto) : Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(this.urlAuthApi + 'refresh-token', jwtDto);
}


}
