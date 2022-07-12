import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SigninUsuarioDto } from 'src/app/models/SigninUsuarioDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLogged = false;
  nuevoUsuario: SigninUsuarioDto;
  nombre: string;
  username: string;
  password: string;
  email: string;
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }


  onRegister(): void {

            //SPIN LOADING
            this.ngxService.start();
            setTimeout(() => {
              this.ngxService.stop();
            }, 300);
            //FIN SPIN LOADING


            //SIGNIN AND TOASTS
  setTimeout(() => {
    this.nuevoUsuario = new SigninUsuarioDto(this.nombre
      , this.username, this.password, this.email);
    this.authService.signin(this.nuevoUsuario).subscribe(
      data => {

        

         //SPIN LOADING
         this.ngxService.start();
         setTimeout(() => {
           this.ngxService.stop();
         }, 300);
         //FIN SPIN LOADING

         this.toast.success({detail:"Operación Exitosa "
         ,summary:'Se ha registrado un nuevo Usuario!'
         , duration:2000});

        this.router.navigate(['/login']);

        console.log('usuario registrado');
      },
      err => {

        this.errMsj = err.error.message;

          //SPIN LOADING
          this.ngxService.start();
          setTimeout(() => {
            this.ngxService.stop();
          }, 100);
          //FIN SPIN LOADING

          //TOAST ERROR
      setTimeout(() => {
        this.toast.error({detail:"ERROR"
        ,summary: this.errMsj, duration:2000});
      }, 200);
      //FIN TOAST ERROR

        console.log(this.errMsj);
      },
    );
  }, 600);
  //FIN SIGNIN AND TOASTS
  }

}
