import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioLogin } from '../../models/usuario-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_URL = 'http://localhost:8098/login';

  constructor(private httpClient : HttpClient) {  }

public login(usuarioLogin : UsuarioLogin) : Observable<any>{
  return this.httpClient.post<any>(this.LOGIN_URL,usuarioLogin);
}

}
