import {Component, OnInit} from '@angular/core';
import {TransactionService} from "@app/client/api/transaction.service";
import {Transaction} from "@app/client/model/transaction";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {CurrencyPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";

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
    MatInput,
    NgIf,
    CurrencyPipe,
    NgClass,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput
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

  weeklyForecast: any;
  monthlyForecast: any;
  quarterlyForecast: any;
  yearlyForecast: any;

  selectedDate: Date | undefined;
  selectedYear: number | undefined;
  selectedMonth: number | undefined;
  selectedQuarter: string | undefined;

  years = this.generateYears();
  months = Array.from({ length: 12 }, (_, i) => i + 1);
  quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.generateReports();
      this.generateForecasts();
    });
  }

  generateReports(): void {
    this.generateWeeklyReport();
    this.generateMonthlyReport();
    this.generateQuarterlyReport();
    this.generateYearlyReport();
  }

  generateForecasts(): void {
    this.generateWeeklyForecast();
    this.generateMonthlyForecast();
    this.generateQuarterlyForecast();
    this.generateYearlyForecast();
  }

  generateWeeklyReport(): void {
    if (!this.selectedDate) return;
    const weekNumber = this.getWeekNumber(this.selectedDate);
    const currentWeek = this.getWeekDates(this.selectedDate.getFullYear(), weekNumber);
    const weeklyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) return false;
      const transactionDate = new Date(transaction.date);
      return transactionDate >= currentWeek.start && transactionDate <= currentWeek.end;
    });

    this.weeklyReport = this.calculateReport(weeklyTransactions);
  }

  generateMonthlyReport(): void {
    if (!this.selectedMonth || !this.selectedYear) return;
    const monthlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) return false;
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === this.selectedYear && transactionDate.getMonth() + 1 === this.selectedMonth;
    });

    this.monthlyReport = this.calculateReport(monthlyTransactions);
  }

  generateQuarterlyReport(): void {
    if (!this.selectedQuarter || !this.selectedYear) return;
    const startMonth = (parseInt(this.selectedQuarter[1]) - 1) * 3;
    const endMonth = startMonth + 2;

    const quarterlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) return false;
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth();
      return transactionDate.getFullYear() === this.selectedYear && month >= startMonth && month <= endMonth;
    });

    this.quarterlyReport = this.calculateReport(quarterlyTransactions);
  }

  generateYearlyReport(): void {
    if (!this.selectedYear) return;
    const yearlyTransactions = this.transactions.filter(transaction => {
      if (!transaction.date) return false;
      const transactionDate = new Date(transaction.date);
      return transactionDate.getFullYear() === this.selectedYear;
    });

    this.yearlyReport = this.calculateReport(yearlyTransactions);
  }

  generateWeeklyForecast(): void {
    const allWeeks = this.generateWeeksForAllYears().slice(-3);
    const weeklySums = allWeeks.map(week => {
      const [year, weekNumber] = week.split('-');
      const currentWeek = this.getWeekDates(parseInt(year), parseInt(weekNumber));
      const weeklyTransactions = this.transactions.filter(transaction => {
        if (!transaction.date) return false;
        const transactionDate = new Date(transaction.date);
        return transactionDate >= currentWeek.start && transactionDate <= currentWeek.end;
      });
      return this.calculateTotalExpense(weeklyTransactions);
    });

    this.weeklyForecast = this.calculateForecast(weeklySums);
  }

  generateMonthlyForecast(): void {
    const lastThreeMonths = this.transactions.filter(transaction => transaction.date)
      .map(transaction => new Date(transaction.date!).getMonth() + 1)
      .slice(-3);
    const monthlySums = lastThreeMonths.map(month => {
      const monthlyTransactions = this.transactions.filter(transaction => {
        if (!transaction.date) return false;
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() + 1 === month;
      });
      return this.calculateTotalExpense(monthlyTransactions);
    });

    this.monthlyForecast = this.calculateForecast(monthlySums);
  }

  generateQuarterlyForecast(): void {
    const lastThreeQuarters = this.quarters.slice(-3);
    const quarterlySums = lastThreeQuarters.map(quarter => {
      const startMonth = (parseInt(quarter[1]) - 1) * 3;
      const endMonth = startMonth + 2;
      const quarterlyTransactions = this.transactions.filter(transaction => {
        if (!transaction.date) return false;
        const transactionDate = new Date(transaction.date);
        const month = transactionDate.getMonth();
        return month >= startMonth && month <= endMonth;
      });
      return this.calculateTotalExpense(quarterlyTransactions);
    });

    this.quarterlyForecast = this.calculateForecast(quarterlySums);
  }

  generateYearlyForecast(): void {
    const validTransactions = this.transactions.filter(transaction => transaction.date);
    if (validTransactions.length === 0) return;

    const startYear = new Date(validTransactions[0].date!).getFullYear();
    const endYear = new Date(validTransactions[validTransactions.length - 1].date!).getFullYear();
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    const lastThreeYears = years.slice(-3);
    const yearlySums = lastThreeYears.map(year => {
      const yearlyTransactions = this.transactions.filter(transaction => {
        if (!transaction.date) return false;
        const transactionDate = new Date(transaction.date);
        return transactionDate.getFullYear() === year;
      });
      return this.calculateTotalExpense(yearlyTransactions);
    });

    this.yearlyForecast = this.calculateForecast(yearlySums);
  }

  calculateForecast(values: number[]): any {
    const validValues = values.filter(value => value > 0);
    if (validValues.length === 0) return { total: 0, average: 0 };
    const total = validValues.reduce((acc, value) => acc + value, 0);
    const average = total / validValues.length;
    return {
      total: total,
      average: average
    };
  }

  calculateTotalExpense(transactions: Transaction[]): number {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'EXPENSE' && transaction.amount) acc += transaction.amount;
      return acc;
    }, 0);
  }

  calculateReport(transactions: Transaction[]): any {
    const report = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'INCOME' && transaction.amount) {
        report.totalIncome += transaction.amount;
      } else if (transaction.type === 'EXPENSE' && transaction.amount) {
        report.totalExpense += transaction.amount;
      }
    });

    report.balance = report.totalIncome - report.totalExpense;
    return report;
  }

  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(i);
    }
    return years;
  }

  generateWeeksForAllYears(): string[] {
    const weeks: string[] = [];
    const validTransactions = this.transactions.filter(transaction => transaction.date);
    if (validTransactions.length === 0) return weeks;

    const startYear = new Date(validTransactions[0].date!).getFullYear();
    const endYear = new Date(validTransactions[validTransactions.length - 1].date!).getFullYear();
    for (let year = startYear; year <= endYear; year++) {
      for (let i = 1; i <= 52; i++) {
        weeks.push(`${year}-${i}`);
      }
    }
    return weeks;
  }

  getWeekNumber(d: Date): number {
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
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
