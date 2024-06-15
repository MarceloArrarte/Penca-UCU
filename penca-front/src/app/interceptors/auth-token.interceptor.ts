import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    let reqToSend: HttpRequest<unknown>;
    if (token) {
      reqToSend = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    else {
      reqToSend = req;
    }

    return next.handle(reqToSend).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.toastService.error('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
          this.authService.navigateToLogin();
        }
        return throwError(() => err);
      })
    );
  }
}
