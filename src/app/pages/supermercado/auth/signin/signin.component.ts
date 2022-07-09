import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  nuevoUsuario: SigninUsuarioDto;
  nombre: string;
  username: string;
  password: string;
  email: string;
  errMsj: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }


  onRegister(): void {
    this.nuevoUsuario = new SigninUsuarioDto(this.nombre, this.username, this.password, this.email);
    this.authService.signin(this.nuevoUsuario).subscribe(
      data => {

         //SPIN LOADING
         this.ngxService.start();
         setTimeout(() => {
           this.ngxService.stop();
         }, 300);
         //FIN SPIN LOADING

        this.toastr.success('Cuenta Creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top'
        });


        this.router.navigate(['/login']);
      },
      err => {
        this.errMsj = err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top',
        });
        // console.log(err.error.message);
      }
    );
  }

}
