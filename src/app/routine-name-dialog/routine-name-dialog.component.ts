import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { createAndroidCode } from '../rete/default';


export interface DialogData {
  name: string;
}


@Component({
  selector: 'dialog-handler-button',
  templateUrl: './dialog-handler-button.component.html',
})
export class DialogHandlerButton {
  name: string;

  constructor(public dialog: MatDialog) {
    this.name = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoutineNameDialogComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed. Name: ${result}`);
      createAndroidCode(result);
      location.reload();
    });
  }
}

@Component({
  selector: 'routine-name-dialog',
  templateUrl: './routine-name-dialog.component.html',
  styleUrls: ['./routine-name-dialog.component.css'],
})
export class RoutineNameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoutineNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
