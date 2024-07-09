import {Component, OnInit} from '@angular/core';
import {IncomeService} from "@app/client/api/income.service";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {Income} from "@app/client/model/income";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    NgForOf,
    CurrencyPipe,
    MatCardHeader,
    DatePipe,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCard
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.css'
})
export class IncomesComponent implements OnInit {
  incomes: Income[] = [];
  groupedIncomes: { [key: string]: Income[] } = {};

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.incomeService.getIncomes().subscribe(data => {
      this.incomes = data;
      this.groupIncomesByDate();
    });
  }

  groupIncomesByDate() {
    this.groupedIncomes = this.incomes.reduce((groups: { [key: string]: Income[] }, income: Income) => {
      if (income.date) {
        const date = income.date.split('T')[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(income);
      } else {
        if (!groups['Brak daty']) {
          groups['Brak daty'] = [];
        }
        groups['Brak daty'].push(income);
      }
      return groups;
    }, {});
  }

  get dates() {
    return Object.keys(this.groupedIncomes).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  }
}
