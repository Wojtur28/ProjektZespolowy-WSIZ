import {Component, Inject} from '@angular/core';
import {Transaction} from "@app/client/model/transaction";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {TransactionService} from "@app/client/api/transaction.service";

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    MatLabel,
    MatInput,
    FormsModule,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions

  ],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent {

  newTransaction: Transaction = { /* initialize your transaction object */ };

  constructor(
    public dialogRef: MatDialogRef<CreateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionService: TransactionService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    this.transactionService.createTransaction(this.newTransaction).subscribe(() => {
      this.dialogRef.close();
    });

  }
}
