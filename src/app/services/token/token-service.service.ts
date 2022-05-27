import { Injectable } from '@angular/core';

//Variables que se almacenan en el cliente
const TOKEN_KEY = 'AuthToken';
const USUARIO_KEY = 'AuthUsuario';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  roles: Array<string> = [];

  constructor() { }


  //================= TOKEN ===============
public setToken(token:string):void{
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY,token);
}
public getToken(): string{
  return sessionStorage.getItem(TOKEN_KEY)!;
}


  //================= USUARIO ===============
  public setUsuario(usuario:string):void{
    window.sessionStorage.removeItem(USUARIO_KEY);
    window.sessionStorage.setItem(USUARIO_KEY,usuario);
  }
  public getUsuario(): string{
    return sessionStorage.getItem(USUARIO_KEY)!;
  }

  //================= AUTHORITIES ===============
  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;

  }

  public logOut() : void{
    window.sessionStorage.clear();
  }



}
