import {Component, OnInit} from '@angular/core';

import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ExpensesComponent} from "@app/features/finances/expenses/expenses.component";
import {IncomesComponent} from "@app/features/finances/incomes/incomes.component";

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    ExpensesComponent,
    IncomesComponent
  ],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.css'
})
export class FinancesComponent implements OnInit {
  view: 'expenses' | 'incomes' = 'expenses';

  constructor() { }

  ngOnInit(): void {
  }

  showExpenses() {
    this.view = 'expenses';
  }

  showIncomes() {
    this.view = 'incomes';
  }
}
