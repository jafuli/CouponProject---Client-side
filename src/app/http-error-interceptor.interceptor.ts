import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LogoutService } from './services/logout.service';

@Injectable()
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private logout: LogoutService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status === 401 || error.status === 504) { // token problem or timeout
            errorMessage = `Error Code: ${error.status}\nMessage: User authentication problem, redirecting to home...`;
            this.logout.setLoginStatus(0);
            sessionStorage.removeItem('userId');
            this.router.navigate(['main']);
            window.alert(errorMessage);
          } else { // all other exceptions
            return throwError(error);
          }
        })
      )

  }

}
