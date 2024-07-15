import {Component, Inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatOption} from "@angular/material/core";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {TransactionService} from "@app/client/api/transaction.service";
import {Transaction} from "@app/client/model/transaction";
import {TransactionCategoryService} from "@app/client/api/transactionCategory.service";
import {TransactionCategory} from "@app/client/model/transactionCategory";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatOption,
    MatSelect,
    MatLabel,
    MatFormField,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatInput,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    NgIf,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent implements OnInit {
  transaction: Transaction;
  categories: TransactionCategory[] = [];
  filteredCategories: TransactionCategory[] = [];
  showTypeWarning: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction },
    private transactionService: TransactionService,
    private categoryService: TransactionCategoryService
  ) {
    this.transaction = { ...data.transaction };
  }

  ngOnInit(): void {
    this.categoryService.getTransactionCategories().subscribe(categories => {
      this.categories = categories;
      this.filterCategories();
    });
  }

  filterCategories() {
    if (this.transaction.type) {
      this.filteredCategories = this.categories.filter(category => category.type === this.transaction.type);
      this.showTypeWarning = false;
    } else {
      this.filteredCategories = [];
      this.showTypeWarning = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onSave(): void {
    if (this.transaction.date) {
      this.transaction.date = this.normalizeDate(this.transaction.date);
    }
    if (this.transaction.id)
    this.transactionService.updateTransaction(this.transaction.id, this.transaction).subscribe(() => {
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
