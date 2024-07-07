import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.getToken() != null) {

      if (request.url.indexOf("/auth/signin") == -1 && request.url.indexOf("/auth/signup") == -1) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
          }
        });
      }

    }
    return next.handle(request);
  }
}
