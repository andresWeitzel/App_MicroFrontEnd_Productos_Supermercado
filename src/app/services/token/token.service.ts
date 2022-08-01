import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


//Variables que se almacenan en el cliente
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})


export class TokenService {

  roles: Array<string> = [];

  constructor(
    private router:Router
  ) { }


  //================= TOKEN ===============
public setToken(token:string):void{
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.setItem(TOKEN_KEY,token);
}
public getToken(): string{
  console.log('TOKEN FIRST',localStorage.getItem(TOKEN_KEY)!);
  return localStorage.getItem(TOKEN_KEY)!;

}


  //================= USERNAME ===============

  public getUsername(): string{

    if(!(this.isLogged)){
      return null;
    }
    const token = this.getToken();
    console.log('TOKEN',token);
    const payload = (token == null) ? null :  token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username = values.sub;

    return username;
  }




  //================= AUTHORITIES ===============

  public isAdmin(): boolean{

    if(!(this.isLogged)){
      return false;
    }
    const token = this.getToken();
    console.log('TOKEN',token);
    const payload = (token == null) ? null :  token.split('.')[1];
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;

    if(roles.indexOf('ROLE_ADMIN') < 0){
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
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }


}
