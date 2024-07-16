import { Routes } from '@angular/router';
import {LoginComponent} from "./features/login/login.component";
import {RegisterComponent} from "./features/register/register.component";
import {HomeComponent} from "./features/home/home.component";
import {AuthGuard} from "@app/service/auth/auth.guard";
import {TransactionComponent} from "@app/features/transaction/transaction.component";
import {ReportComponent} from "@app/features/report/report.component";

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
    path: 'transaction',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportComponent,
    canActivate: [AuthGuard]
  }
];
