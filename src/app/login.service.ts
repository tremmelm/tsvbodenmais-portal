import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, catchError } from "rxjs/operators";
//import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authenticationServiceUrl = "http://localhost:8081/login";

  constructor(private http: HttpClient) { }

  public getToken(username: string, password: string): Observable<Authorization>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };
    
    let urlEncodedBody = encodeURI(`username=${username}&password=${password}`);
    //return this.http.post<string>(this.authenticationServiceUrl, urlEncodedBody, httpOptions).pipe(map((data : Response) => data.json));
    return this.http.post<string>(this.authenticationServiceUrl, urlEncodedBody, httpOptions).pipe(map((data : Response) => {
      console.log(data);
      return data;
    }));
  }

}

export class Authorization{
  public auth : boolean;
  public token: string;
}
