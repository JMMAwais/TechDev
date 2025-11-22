import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpClient, HttpHandlerFn } from '@angular/common/http';
import { Observable, catchError, switchMap, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const http = inject(HttpClient); // inject HttpClient
  let isRefreshing = false;

  const token = localStorage.getItem("access_token");

  let cloned = req;

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(cloned).pipe(
    catchError(err => {
      if (err.status === 401 && !isRefreshing) {
        return refreshToken(http).pipe(
          switchMap(newToken => {
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(newReq);
          })
        );
      }

      return of(err as any);
    })
  );
};

function refreshToken(http: HttpClient): Observable<string> {
  let isRefreshing = true;

  const refreshToken = localStorage.getItem("refresh_token");

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken!);
  body.set("client_secret", "tenant-osama-publis-schol");

  return http.post<any>("https://localhost:7190/identity/Auth/token", body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }).pipe(
    switchMap(res => {
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      localStorage.setItem("expires_at", (Date.now() + res.expires_in * 1000).toString());

      isRefreshing = false;
      return of(res.access_token);
    })
  );
}
