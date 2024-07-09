import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIcon} from "@angular/material/icon";
import {MatMenuItem} from "@angular/material/menu";
import {MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AuthService} from "./service/auth/auth.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatMenuItem, RouterLink, MatSidenavContent, MatSidenavContainer, MatToolbar, MatButton, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';

  constructor(public authService: AuthService) {
  }
}
