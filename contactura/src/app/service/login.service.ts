import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authentication } from '../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  api_url = environment.api_url;

  authenticate(authentication: Authentication){
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(authentication.username + ':' + authentication.password)});
    return this.http.get<string>(this.api_url + '/user/login', {headers}).pipe(
      map(
        
        authData => {
          return authData; 
        }      
        
      )
    );
  }

}
