import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorsProductosService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let interceptRequest = req;

    const token = this.tokenService.getToken();

    //Si no esta logueado interceptamos el sig request
    if (!this.tokenService.isLogged) {
      return next.handle(req);
    }

    //Si no tenemos token interceptamos uno
    if (token != null) {
      interceptRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    //manejamos los request...controlamos en caso de error
    return next.handle(interceptRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {

          //SPIN LOADING
          this.ngxService.start();
          setTimeout(() => {
            this.ngxService.stop();
          }, 100);
          //FIN SPIN LOADING

          this.tokenService.logOut();

          //TOAST ERROR
          setTimeout(() => {
            this.toast.error({
              detail: 'ERROR',
              summary: 'No está Autorizado!!',
              duration: 2000,
            });
          }, 600);
          //FIN TOAST ERROR
          return throwError(err);
        }
      })
    );
  }
}

export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorsProductosService,
    multi: true,
  },
];
