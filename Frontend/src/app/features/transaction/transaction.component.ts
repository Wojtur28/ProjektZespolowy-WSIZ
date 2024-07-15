import { Component, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from "@angular/material/table";
import { Transaction } from "@app/client/model/transaction";
import { TransactionService } from "@app/client/api/transaction.service";
import { MatIcon } from "@angular/material/icon";
import { CreateTransactionComponent } from "@app/features/transaction/create-transaction/create-transaction.component";
import { MatDialog } from "@angular/material/dialog";
import {
  TransactionCategoriesComponent
} from "@app/features/transaction/transaction-categories/transaction-categories.component";
import {EditTransactionComponent} from "@app/features/transaction/edit-transaction/edit-transaction.component";
import {TransactionCategoryService} from "@app/client/api/transactionCategory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    DatePipe,
    CurrencyPipe,
    MatCardHeader,
    MatCard,
    NgForOf,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatTable,
    NgClass,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  groupedTransactions: { [date: string]: Transaction[] } = {};
  filteredTransactions: { [date: string]: Transaction[] } = {};
  selectedMonth: number = new Date().getMonth() + 1;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  monthNames: string[] = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  overLimitCategories: string[] = [];

  constructor(private transactionService: TransactionService,
              private categoryService: TransactionCategoryService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedMonth = new Date().getMonth() + 1;
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.groupTransactionsByDate(transactions);
      this.filterTransactionsByMonth(this.selectedMonth);
      this.checkLimits();
    });
  }

  groupTransactionsByDate(transactions: Transaction[]) {
    this.groupedTransactions = transactions.reduce((groups, transaction) => {
      const date = transaction.date ? transaction.date.split('T')[0] : 'Brak daty';
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {} as { [date: string]: Transaction[] });

    this.groupedTransactions = Object.keys(this.groupedTransactions)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .reduce((obj, key) => {
        obj[key] = this.groupedTransactions[key];
        return obj;
      }, {} as { [date: string]: Transaction[] });
  }

  filterTransactionsByMonth(month: number) {
    this.filteredTransactions = {};
    for (const date in this.groupedTransactions) {
      if (new Date(date).getMonth() + 1 === month) {
        this.filteredTransactions[date] = this.groupedTransactions[date];
      }
    }
  }

  checkLimits() {
    this.overLimitCategories = [];
    this.categoryService.getTransactionCategories().subscribe(categories => {
      for (const category of categories) {
        let totalAmount = 0;
        for (const date in this.groupedTransactions) {
          for (const transaction of this.groupedTransactions[date]) {
            if (transaction.category && transaction.category.id === category.id && transaction.type === 'EXPENSE' && transaction.amount !== undefined) {
              totalAmount += transaction.amount;
            }
          }
        }
        if (category.expenseLimit !== undefined && category.name && totalAmount > category.expenseLimit) {
          this.overLimitCategories.push(category.name);
        }
      }
    });
  }

  setMonth(month: number): void {
    this.selectedMonth = month;
    this.filterTransactionsByMonth(month);
  }

  getFormattedDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  isExpense(transaction: Transaction): boolean {
    return transaction.type === 'EXPENSE';
  }

  isIncome(transaction: Transaction): boolean {
    return transaction.type === 'INCOME';
  }

  getDates(): string[] {
    return Object.keys(this.filteredTransactions);
  }

  getDailyBalance(date: string): number {
    const transactions = this.filteredTransactions[date];
    let balance = 0;
    transactions.forEach(transaction => {
      if (transaction.amount !== undefined) {
        if (this.isIncome(transaction)) {
          balance += transaction.amount;
        } else if (this.isExpense(transaction)) {
          balance -= transaction.amount;
        }
      }
    });
    return balance;
  }

  editTransaction(transaction: Transaction): void {
    console.log('Editing transaction:', transaction);
    const dialogRef = this.dialog.open(EditTransactionComponent, {
      width: '300px',
      data: { transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.transactionService.updateTransaction(result.id, result).subscribe(() => {
            this.loadTransactions();
          }, error => {
            console.error('Error updating transaction:', error);
          });
        } else {
          console.error('Result does not contain an ID:', result);
          this.loadTransactions();
        }
      } else {
        console.log('Dialog was closed without saving changes.');
      }
    });
  }

  deleteTransaction(id: string): void {
    if (confirm('Czy na pewno chcesz usunąć tę transakcję?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.loadTransactions();
      });
    }
  }

  openNewTransactionDialog(): void {
    const dialogRef = this.dialog.open(CreateTransactionComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTransactions();
      }
    });
  }

  openManageCategoriesDialog(): void {
    this.dialog.open(TransactionCategoriesComponent, {
      width: '80%',
      maxWidth: '1000px'
    });
  }
}
