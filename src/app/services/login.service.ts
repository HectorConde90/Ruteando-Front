import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getLogged());
   isLogged: boolean;
  private BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }


  login(user) {
    return this.http.post<any[]>(this.BASE_URL + 'user/login', user).toPromise();
  }


  setToken(token: any): void {
    localStorage.setItem('accesToken', JSON.stringify(token));
    localStorage.setItem('isLogged', 'true');
  }

  getToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (!(accessToken === undefined || accessToken === null)) {
      return accessToken;
    } else {
      return null;
    }

  }


  getLogged(): boolean {

    if (localStorage.getItem('isLogged') === 'true') {

      return true;
    } else {
      this.isLogged = false;
      return false;
    }

  }

  logOut() {
    localStorage.removeItem('accesToken');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('coordinates')
  }
}
