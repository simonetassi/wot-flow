import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from './validation-alert.interface';

@Injectable({
    providedIn: 'root',
})
export class ValidationAlertService {
    private alertSubject = new Subject<Alert>();
    alertObservable$ = this.alertSubject.asObservable();

    showAlert(alert: Alert) {
        this.alertSubject.next(alert);
    }
}
