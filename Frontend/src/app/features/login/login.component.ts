import { Component } from '@angular/core';
import {LoginService} from "../../service/auth/login.service";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

export class LoginCommand {
  login: string = "";
  password: string = "";
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginCommand = new LoginCommand();

  constructor(private loginService: LoginService) {

  }
  onSubmit() {
    this.loginService.login(this.loginCommand.login, this.loginCommand.password);
  }
}
