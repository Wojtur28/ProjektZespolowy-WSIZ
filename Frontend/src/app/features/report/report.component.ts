import {Component, OnInit} from '@angular/core';
import {TransactionService} from "@app/client/api/transaction.service";
import {Transaction} from "@app/client/model/transaction";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatSelect,
    MatLabel,
    MatFormField,
    MatOption,
    NgForOf,
    FormsModule,
    MatInput
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  transactions: Transaction[] = [];
  weeklyReport: any;
  monthlyReport: any;
  quarterlyReport: any;
  yearlyReport: any;

  selectedWeek: string | undefined;
  selectedMonth: number | undefined;
  selectedQuarter: string | undefined;
  selectedYear: number | undefined;

  weeks = this.generateWeeks();
  months = Array.from({ length: 12 }, (_, i) => i + 1);
  quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear();
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.generateReports();
    });
  }

  generateReports(): void {
    this.generateWeeklyReport();
    this.generateMonthlyReport();
    this.generateQuarterlyReport();
    this.generateYearlyReport();
  }

  generateWeeklyReport(): void {
    if (!this.selectedWeek) return;
    const [year, week] = this.selectedWeek.split('-');
    const currentWeek = this.getWeekDates(parseInt(year), parseInt(week));
    const weeklyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) {
        return false;
      }
      const transactionDate = new Date(transaction.date);
      return transactionDate >= currentWeek.start && transactionDate <= currentWeek.end;
    });

    const report = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    };

    weeklyTransactions.forEach(transaction => {
      if (transaction.type === 'INCOME' && transaction.amount) {
        report.totalIncome += transaction.amount;
      } else if (transaction.type === 'EXPENSE' && transaction.amount) {
        report.totalExpense += transaction.amount;
      }
    });

    report.balance = report.totalIncome - report.totalExpense;
    this.weeklyReport = report;
  }

  generateMonthlyReport(): void {
    if (!this.selectedMonth) return;
    const monthlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) {
        return false;
      }
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === this.selectedYear && transactionDate.getMonth() + 1 === this.selectedMonth;
    });

    const report = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    };

    monthlyTransactions.forEach(transaction => {
      if (transaction.type === 'INCOME' && transaction.amount) {
        report.totalIncome += transaction.amount;
      } else if (transaction.type === 'EXPENSE' && transaction.amount) {
        report.totalExpense += transaction.amount;
      }
    });

    report.balance = report.totalIncome - report.totalExpense;
    this.monthlyReport = report;
  }

  generateQuarterlyReport(): void {
    if (!this.selectedQuarter) return;
    const startMonth = (parseInt(this.selectedQuarter[1]) - 1) * 3;
    const endMonth = startMonth + 2;

    const quarterlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) {
        return false;
      }
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth();
      return transactionDate.getFullYear() === this.selectedYear && month >= startMonth && month <= endMonth;
    });

    const report = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    };

    quarterlyTransactions.forEach(transaction => {
      if (transaction.type === 'INCOME' && transaction.amount) {
        report.totalIncome += transaction.amount;
      } else if (transaction.type === 'EXPENSE' && transaction.amount) {
        report.totalExpense += transaction.amount;
      }
    });

    report.balance = report.totalIncome - report.totalExpense;
    this.quarterlyReport = report;
  }

  generateYearlyReport(): void {
    if (!this.selectedYear) return;
    const yearlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) {
        return false;
      }
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === this.selectedYear;
    });

    const report = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    };

    yearlyTransactions.forEach(transaction => {
      if (transaction.type === 'INCOME' && transaction.amount) {
        report.totalIncome += transaction.amount;
      } else if (transaction.type === 'EXPENSE' && transaction.amount) {
        report.totalExpense += transaction.amount;
      }
    });

    report.balance = report.totalIncome - report.totalExpense;
    this.yearlyReport = report;
  }

  generateWeeks(): string[] {
    const weeks = [];
    const year = new Date().getFullYear();
    for (let i = 1; i <= 52; i++) {
      weeks.push(`${year}-${i}`);
    }
    return weeks;
  }

  getWeekDates(year: number, week: number): { start: Date, end: Date } {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dayOfWeek = simple.getDay();
    const start = simple;
    if (dayOfWeek <= 4) {
      start.setDate(simple.getDate() - simple.getDay() + 1);
    } else {
      start.setDate(simple.getDate() + 8 - simple.getDay());
    }
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }
}

