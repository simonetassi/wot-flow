// validation-alert.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Alert } from './validation-alert.interface';

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation-alert.component.html',
  styleUrls: ['./validation-alert.component.css'],
})
export class ValidationAlertComponent implements OnInit {
  @Input() alert!: Alert;

  constructor() {}

  ngOnInit(): void {
    console.log(this.alert);
  }
}
