// https://code-maze.com/cookie-authentication-aspnetcore-angular/
//for authentication mechanism

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthRoleService } from '../services/auth-role.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private authRoleService: AuthRoleService,
    private notificationService: NotificationService
  ) {}

  request: any;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngxLoader.startBackground('master');
    if (!req.url.includes('auth/login')) {
      this.request = req.clone({
        setHeaders: {
          'X-CSRFToken': document.cookie.split(';')[0].substring(10),
        },
        withCredentials: true,
        url: environment.apiUrl + req.url,
      });
    } else {
      this.request = req.clone({
        withCredentials: true,
        url: environment.apiUrl + req.url,
      });
    }

    return next.handle(this.request).pipe(
      catchError((err: any, caught: Observable<any>) => {
        const { status } = err;
        this.ngxLoader.stopBackground('master');
        if (err.status == 500) return throwError(() => err);
        if (Array.isArray(err.error)) {
          for (const error of err.error) {
            this.notificationService.error(error);
          }
        } else if (status == 403 && req.url != '/auth/user/') {
          this.authRoleService.doLogoutUser();
        } else {
          for (const key in err.error) {
            if (Array.isArray(err.error[key])) {
              for (const error of err.error[key]) {
                if (key !== 'non_field_errors') {
                  this.notificationService.error(`${key}: ${error}`);
                } else {
                  this.notificationService.error(error);
                }
              }
            } else if (typeof err.error[key] !== 'object') {
              if (
                req.url != '/auth/user/' &&
                !err.url.includes('litigation/disputes')
              ) {
                this.notificationService.error(err.error[key]);
              }
            }
          }
        }

        if (status == 401) {
          this.authRoleService.doLogoutUser();
          this.notificationService.warning(
            'Your session has expired due to inactivity. Please login again.'
          );
        }
        return throwError(() => err);
      }),
      finalize(() => this.ngxLoader.stopBackground('master'))
    );
  }
}
