import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged=false;


  constructor(
    private tokenService: TokenService,
    private toast: NgToastService

    ) { }

ngOnInit(){
  if(this.tokenService.getToken()){
    this.isLogged=true;
  }else{
    this.isLogged=false;
  }
  }

  onLogOut(){


    this.tokenService.logOut();

    this.toast.info({detail:"Info",summary:'Sesión Cerrada Correctamente', duration:3000});


    window.setTimeout(function(){location.reload()},3000)



  }

}
