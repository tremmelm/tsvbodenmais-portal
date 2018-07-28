import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Roster, Service } from './roster';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  private getRosterServiceUrl = 'http://localhost:8081/getRoster';
  private saveRosterServiceUrl = 'http://localhost:8081/updateRoster';

  constructor(private http: HttpClient) { }

  public getRoster():Observable<any>{
    //TODO: move to TokenInterceptor
    let httpOptions = {
      headers: new HttpHeaders({
        'authorization':  `Bearer ${localStorage.getItem('token')}`
      })
    };
    
    return this.http.get(this.getRosterServiceUrl, httpOptions);
  }

  public saveRoster(roster : Roster) : Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'authorization':  `Bearer ${localStorage.getItem('token')}`
      })
    };
    
    return this.http.post(this.saveRosterServiceUrl, roster, httpOptions);
  }

}
