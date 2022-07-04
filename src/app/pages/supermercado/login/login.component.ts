import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuarioDto } from 'src/app/models/LoginUsuarioDto';
import { TokenService } from 'src/app/services/token/token.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  LoginUsuarioDto : LoginUsuarioDto;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private loginService : LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }


  ngOnInit(){
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }




  onLogin(): void {
    this.LoginUsuarioDto = new LoginUsuarioDto(this.nombreUsuario, this.password);
    this.loginService.login(this.LoginUsuarioDto).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsuario(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/inicio']);
        console.log('logueado');
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err.error.message);
      }
    );
  }

}
