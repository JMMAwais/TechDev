import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const http = inject(HttpClient);
  const router = inject(Router);

  const accessToken = localStorage.getItem("access_token");

  console.log('chal rha hai',accessToken)
  // Attach Access Token
  let authReq = req;
  console.log('check ho rha', authReq)
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true   // IMPORTANT → send HTTP-only cookie
    });
    console.log('second auth request', authReq)
  }

  return next(authReq).pipe(
    catchError(error => {

      // Only refresh when 401 and not already refreshing
      if (error.status === 401 && !req.url.includes("/connect/token")) {

        // Prepare refresh request (browser will include refresh cookie automatically)
        const body = new URLSearchParams();
        body.set("grant_type", "refresh_token");
        body.set("client_id", "spa-client");

        return http.post<any>(
          "https://your-api.com/connect/token",
          body.toString(),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            withCredentials: true    // MUST → cookie with refresh token sent
          }
        ).pipe(
          switchMap(res => {

            // Save new access token
            localStorage.setItem("access_token", res.access_token);

            // Retry original request
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`
              },
              withCredentials: true
            });

            return next(retryReq);
          }),

          // If refresh fails → force logout
          catchError(refreshErr => {
            localStorage.removeItem("access_token");
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
