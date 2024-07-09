import {Component, OnInit} from '@angular/core';
import {ExpenseService} from "@app/client/api/expense.service";
import {Expense} from "@app/client/model/expense";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    CurrencyPipe,
    NgForOf,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    DatePipe
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  groupedExpenses: { [key: string]: Expense[] } = {};

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
      this.groupExpensesByDate();
    });
  }

  groupExpensesByDate() {
    this.groupedExpenses = this.expenses.reduce((groups: { [key: string]: Expense[] }, expense: Expense) => {
      if (expense.date) {
        const date = expense.date.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(expense);
      } else {
        if (!groups['Brak daty']) {
          groups['Brak daty'] = [];
        }
        groups['Brak daty'].push(expense);
      }
      return groups;
    }, {});
  }

  get dates() {
    return Object.keys(this.groupedExpenses).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }
}

