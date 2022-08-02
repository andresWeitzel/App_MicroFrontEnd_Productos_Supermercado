import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


//Variables que se almacenan en el cliente
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router:Router) { }


  //================= TOKEN ===============
public setToken(token:string):void{
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY,token);
}
public getToken(): string{
  return sessionStorage.getItem(TOKEN_KEY)!;
}


  //================= USERNAME ===============
  public setUsername(username:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }




  public getUsername(): string{

    if(!(this.isLogged)){
      return null;
    }

    const token = this.getToken();
    console.log('TOKEN',token);

    const payload = (token == null) ? null :  token.split('.')[1];
    console.log('TOKEN PAYLOAD',payload);

    const payloadDecoded = atob(payload);
    console.log('TOKEN PAYLOAD DECODED',payloadDecoded);


    const values = JSON.parse(payloadDecoded);
    console.log('TOKEN VALORES',values);

    const username = values.sub;
    console.log('TOKEN ROLES',username);

    return username;

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


  public isAdmin(): boolean{

    if(!(this.isLogged)){
      return false;
    }
    const token = this.getToken();
    console.log('TOKEN',token);

    const payload = (token == null) ? null :  token.split('.')[1];
    console.log('TOKEN PAYLOAD',payload);

    const payloadDecoded = atob(payload);
    console.log('TOKEN PAYLOAD DECODED',payloadDecoded);


    const values = JSON.parse(payloadDecoded);
    console.log('TOKEN VALORES',values);

    const roles = values.roles;
    console.log('TOKEN ROLES',roles);

    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }

    return true;


  }


  public isUser(): boolean{

    if(!(this.isLogged)){
      return false;
    }
    const token = this.getToken();
    console.log('TOKEN',token);

    const payload = (token == null) ? null :  token.split('.')[1];
    console.log('TOKEN PAYLOAD',payload);

    const payloadDecoded = atob(payload);
    console.log('TOKEN PAYLOAD DECODED',payloadDecoded);


    const values = JSON.parse(payloadDecoded);
    console.log('TOKEN VALORES',values);

    const roles = values.roles;
    console.log('TOKEN ROLES',roles);


    if (roles.indexOf('ROLE_USER') < 0) {
      return false;
    }

    return true;
  }



  public isLogged():boolean{
    if(this.getToken()){
      return true;
    }
      return false;


  }


  public logOut() : void{
    window.sessionStorage.clear();
    this.router.navigate(['/login']);

  }


}
