import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }


  register(user) {
    return this.http.post<any[]>(this.BASE_URL + 'user/register', user).toPromise();
  }
}
