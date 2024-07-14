import { Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {RegisterComponent} from "./features/register/register.component";
import {HomeComponent} from "./features/home/home.component";
import {FinancesComponent} from "./features/finances/finances.component";
import {AuthGuard} from "@app/service/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'finances',
    component: FinancesComponent,
    canActivate: [AuthGuard]
  }
];
