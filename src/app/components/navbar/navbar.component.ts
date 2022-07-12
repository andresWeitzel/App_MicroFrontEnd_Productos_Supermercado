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


  constructor(
    private tokenService: TokenService,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService,
    private router: Router,

    ) { }

ngOnInit(){
  if(this.tokenService.getToken()){
    this.isLogged=true;
  }else{
    this.isLogged=false;
  }
  }

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

        window.setTimeout(function(){location.reload()},1500);


       }, 600);




    }, 600);
    //FIN LOGOUT AND TOASTS






  }

}
