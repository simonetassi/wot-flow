import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { createAndroidCode } from '../rete/default';
import { DataService } from '../data.service';


export interface DialogData {
  name: string;
}


@Component({
  selector: 'dialog-handler-button',
  templateUrl: './dialog-handler-button.component.html',
})
export class DialogHandlerButton {
  name: string;

  constructor(public dialog: MatDialog, private dataService: DataService) {
    this.name = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoutineNameDialogComponent, {
      data: { name: this.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      createAndroidCode(result, this.dataService);
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
