// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Routine {
  id: string;
  name: string;
  javaCode: string;
  tsCode: string;
  thingIds: string;

  constructor(id: string, name: string, javaCode: string, tsCode: string, thingIds: string) {
    this.id = id;
    this.name = name;
    this.javaCode = javaCode;
    this.tsCode = tsCode;
    this.thingIds = thingIds;
  }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private zionUrl = '/zion/things';
  private apiUrl = '/api/routines/';

  constructor(private http: HttpClient) { }

  public getThings(): Observable<any> {
    const url = this.zionUrl;
    return this.http.get(url);
  }

  public postRoutine(routine: Routine) {
    const url = this.apiUrl;
    return this.http.post(url,routine);
  }
}
