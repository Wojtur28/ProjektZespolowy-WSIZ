import { Component, OnInit } from '@angular/core';
import { MatButton, MatIconButton } from "@angular/material/button";
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable } from "@angular/material/table";
import { Transaction } from "@app/client/model/transaction";
import { TransactionService } from "@app/client/api/transaction.service";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { MatIcon } from "@angular/material/icon";
import { CreateTransactionComponent } from "@app/features/finances/create-transaction/create-transaction/create-transaction.component";
import { MatDialog } from "@angular/material/dialog";

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
    MatIconButton
  ],
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css']
})
export class FinancesComponent implements OnInit {
  groupedTransactions: { [date: string]: Transaction[] } = {};

  constructor(private transactionService: TransactionService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.groupTransactionsByDate(transactions);
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

    // Sort the dates in descending order
    this.groupedTransactions = Object.keys(this.groupedTransactions)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .reduce((obj, key) => {
        obj[key] = this.groupedTransactions[key];
        return obj;
      }, {} as { [date: string]: Transaction[] });
  }

  getFormattedDate(date: string): string {
    const parsedDate = new Date(date);
    return format(parsedDate, 'EEEE, yyyy-MM-dd', { locale: pl });
  }

  isExpense(transaction: Transaction): boolean {
    return transaction.type === 'EXPENSE';
  }

  isIncome(transaction: Transaction): boolean {
    return transaction.type === 'INCOME';
  }

  getDates(): string[] {
    return Object.keys(this.groupedTransactions);
  }

  getDailyBalance(date: string): number {
    const transactions = this.groupedTransactions[date];
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
    console.log('Edytuj transakcję:', transaction);
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
}
