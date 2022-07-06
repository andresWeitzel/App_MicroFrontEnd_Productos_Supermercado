import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuarioDto } from 'src/app/models/LoginUsuarioDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  isLogged = false;
  isLoginFail = false;
  loginUsuarioDto : LoginUsuarioDto;
  username: string;
  password: string;
  roles: string[] = [];
  errMsj: string;


  constructor(
    private tokenService: TokenService,
    private authService : AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(){
     //---------- Check Logueo ------------
     if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }



  onLogin(): void {
    this.loginUsuarioDto = new LoginUsuarioDto(this.username, this.password);
    this.authService.login(this.loginUsuarioDto).subscribe(
      data => {

        this.isLogged = true;
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);

        this.roles = data.authorities;

        this.toastr.success('Bienvenido ' + data.username, 'OK', {
          timeOut: 3000, positionClass: 'toast-top'
        });

        this.router.navigate(['/inicio']);
        console.log('logueado');
      },
      err => {

        this.isLogged = false;
        this.isLoginFail=true;

        this.errMsj = err.error.message;

        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top',
        });

        console.log(this.errMsj);
      }
    );
  }

}
