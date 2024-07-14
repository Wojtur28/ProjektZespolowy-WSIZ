import { Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {RegisterComponent} from "./features/register/register.component";
import {HomeComponent} from "./features/home/home.component";
import {AuthGuard} from "@app/service/auth/auth.guard";
import {TransactionComponent} from "@app/features/transaction/transaction.component";

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
    component: TransactionComponent,
    canActivate: [AuthGuard]
  }
];
