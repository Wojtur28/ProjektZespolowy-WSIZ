import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environments} from "../../environments/environments";
import {MatSnackBar} from "@angular/material/snack-bar";

class LoginResponse {
  token: string = "";
}

export class LoginRequest {
  private email: string;
  private password: string;

  constructor(username: string, password: string) {
    this.email = username;
    this.password = password;
  }

}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  async login(username: string, password: string) {
    const loginRequest = new LoginRequest(username, password);
    const [response] = await Promise.all(
      [this.httpClient.post<LoginResponse>(`${environments.apiAuthEndpoint}/auth/signin`, loginRequest)]);
    response.subscribe(value => {
        this.extractAuthenticationResponse(value);
        this.router.navigateByUrl("/")
      },
      error => {
        console.error(error);
        let snackBarRef = this.snackBar.open('Niepoprawne dane', 'Close',
          {duration: 3000});
      }
    )
  }

  private extractAuthenticationResponse(response: LoginResponse) {
    localStorage.setItem('token', response.token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
