// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = '/api/things';

  constructor(private http: HttpClient) {}

  public getThings(): Observable<any> {
    const url = this.apiUrl;
    return this.http.get(url);
  }
}
