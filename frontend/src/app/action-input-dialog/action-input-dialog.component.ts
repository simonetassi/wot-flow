import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';


export interface DialogData {
  values: { [key: string]: string };
  inputs: string[];
}

@Component({
  selector: 'action-input-dialog',
  templateUrl: './action-input-dialog.component.html',
  styleUrls: ['./action-input-dialog.component.css'],
})
export class ActionInputDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ActionInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFormValid(): boolean {
    return this.data.inputs.every(input => !!this.data.inputs);
  }
}
