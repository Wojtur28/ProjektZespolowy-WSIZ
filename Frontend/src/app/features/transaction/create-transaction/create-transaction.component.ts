import { Component, Inject, OnInit } from '@angular/core';
import { Transaction } from "@app/client/model/transaction";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from "@app/client/api/transaction.service";
import { TransactionCategoryService } from "@app/client/api/transactionCategory.service";
import { TransactionCategory } from "@app/client/model/transactionCategory";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    MatLabel,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatDialogActions,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  newTransaction: Transaction = {};
  categories: TransactionCategory[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService,
    private categoryService: TransactionCategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getTransactionCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    // Normalizacja daty przed wysłaniem na serwer
    if (this.newTransaction.date) {
      this.newTransaction.date = this.normalizeDate(this.newTransaction.date);
    }
    this.transactionService.createTransaction(this.newTransaction).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  private normalizeDate(date: string | Date): string {
    const parsedDate = new Date(date);
    const offset = parsedDate.getTimezoneOffset();
    const correctedDate = new Date(parsedDate.getTime() - (offset * 60 * 1000));
    return correctedDate.toISOString().split('T')[0];
  }
}
