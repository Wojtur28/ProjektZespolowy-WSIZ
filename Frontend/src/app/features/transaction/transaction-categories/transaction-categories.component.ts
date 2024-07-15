import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionCategoryService } from "@app/client/api/transactionCategory.service";
import { TransactionCategory } from "@app/client/model/transactionCategory";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-transaction-categories',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgForOf,
    MatTableModule,
    MatIconModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './transaction-categories.component.html',
  styleUrls: ['./transaction-categories.component.css']
})
export class TransactionCategoriesComponent implements OnInit {
  categories: TransactionCategory[] = [];
  newCategory: Partial<TransactionCategory> = {};

  constructor(
    private categoryService: TransactionCategoryService,
    public dialogRef: MatDialogRef<TransactionCategoriesComponent>
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getTransactionCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  updateCategory(category: TransactionCategory) {
    if (category.id) {
      this.categoryService.updateTransactionCategory(category.id, category).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  deleteCategory(id: string) {
    this.categoryService.deleteTransactionCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }

  addEmptyCategory() {
    const emptyCategory: TransactionCategory = { name: 'Nowa Kategoria', type: 'INCOME', expenseLimit: 0 };
    this.categoryService.createTransactionCategory(emptyCategory).subscribe(() => {
      this.loadCategories();
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getTypeLabel(type: TransactionCategory.TypeEnum): string {
    return type === 'INCOME' ? 'Przychód' : 'Wydatek';
  }
}
