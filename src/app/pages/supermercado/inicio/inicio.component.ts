import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  username:string = '';

  constructor(
    private tokenService : TokenService
    ) { }

  ngOnInit(): void {

    this.checkUsername();

  }

  //============== SECURITY =============

  private checkUsername(){
    this.username = this.tokenService.getUsername();
  }

}
