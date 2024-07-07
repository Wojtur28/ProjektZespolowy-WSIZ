import {Component} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {RegisterService} from "../../service/auth/register.service";
import {Router} from "@angular/router";
import {SignUpRequest} from "../../service/auth/signUpRequest";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatButton,
    MatCard
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  registerCommand = new SignUpRequest();

  onSubmit() {
    this.registerService.signup(this.registerCommand).subscribe(
      value => {
        this.router.navigateByUrl("/login")
        }
    );
  }
}

