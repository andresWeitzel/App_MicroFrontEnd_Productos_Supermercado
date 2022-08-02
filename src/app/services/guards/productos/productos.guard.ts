import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosGuard implements CanActivate {


  rol:string;

  isAdmin:boolean=false;
  isUser:boolean=false;


  constructor(
    private tokenService:TokenService,
    private router:Router
  ) { }




  canActivate(): boolean  {

      this.isAdmin = this.tokenService.isAdmin();
      this.isUser = this.tokenService.isUser();

      if(!(this.tokenService.isLogged())
      || (!(this.isAdmin) && !(this.isUser))
      ){
        this.router.navigate(['/login']);

        return false;
      }
      return true;


  }

}
