import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { TokenService } from 'src/app/services/token/token.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged=false;
  isAdmin = false;


  constructor(
    private tokenService: TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,
    private router: Router,

    ) { }

ngOnInit(){
  this.checkIsLogged();
  this.checkIsAdmin();
  }


 //=========== SEGURIDAD ==============

 checkIsLogged(){
  this.isLogged=this.tokenService.isLogged();
}

checkIsAdmin(){
  this.isAdmin=this.tokenService.isAdmin();
}


//============== LOGOUT ================
  onLogOut(){

  //SPIN LOADING
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 300);
    //FIN SPIN LOADING

    //LOGOUT AND TOASTS
    setTimeout(() => {

      this.tokenService.logOut();

      this.router.navigate(['/login']);


      setTimeout(() => {

        this.toast.info({detail:"Info",summary:'Sesión Cerrada Correctamente', duration:1400});

       }, 600);

    }, 600);
    //FIN LOGOUT AND TOASTS

  }

}
