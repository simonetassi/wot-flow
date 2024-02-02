import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { addActionNode, createAndroidCode } from '../rete/default';
import { editorIsEmpty } from '../rete/default';
import { DataService } from '../data.service';


export interface DialogData {
  value: string;
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
}
