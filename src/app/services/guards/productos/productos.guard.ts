import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosGuard implements CanActivate {


  rol:string='';

  constructor(
    private tokenService:TokenService,
    private router:Router
  ) { }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

      const expectedRol = route.data['expectedRol'];


      this.rol = this.tokenService.isAdmin() ? 'admin' : 'user';


      if(!(this.tokenService.isLogged())
      || (expectedRol.indexOf(this.rol) < 0)
      ){
        //this.router.navigate(['/login']);
        this.router.navigate(['/']);
        return false;
      }
      return true;


  }

}
