import {Injectable} from '@angular/core';
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpRequest} from "./signUpRequest";
import {environments} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public signup(signup: SignUpRequest): Observable<User> {

    return this.httpClient.post<User>(`${environments.apiAuthEndpoint}/auth/signup`,
      signup);
  }
}
