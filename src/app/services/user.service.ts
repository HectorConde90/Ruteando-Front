import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.BASE_URL;

  headers: HttpHeaders;
  token: string;

  constructor(private http: HttpClient) { }



  createHeader() {


    this.token = JSON.parse(localStorage.getItem('accesToken'));
    return this.headers = new HttpHeaders({ Authorization: 'bearer ' +  this.token['token'] });
  }



  getMyRoutes() {

    return this.http.get<any>(this.baseUrl + 'user/routes/myroutes', { headers: this.createHeader() });
  }
  getUser() {
    return this.http.get<any>(this.baseUrl + 'user', { headers: this.createHeader()}).toPromise();
  }


  newRoute(newRoute) {
    return this.http.post<any>(this.baseUrl + 'routes', newRoute, { headers: this.createHeader() }).toPromise();
  }
  deleteRoute(id) {
    return this.http.delete<any>(this.baseUrl + 'routes/' + id, { headers: this.createHeader() }).subscribe();
  }

  updateRoute(route, id) {

    return this.http.put<any>(this.baseUrl + 'routes/' + id, route, { headers: this.createHeader() }).toPromise();



  }
  addFavoriteRoute(route_id) {
    return this.http.post<any>(this.baseUrl + 'user/routes/favorite', route_id, { headers: this.createHeader() }).toPromise();
  }

  getFavoriteRoutes() {
    return this.http.get<any>(this.baseUrl + 'user/routes/favorite', { headers: this.createHeader() });
  }

  removeFavoriteRoutes(id) {
    return this.http.get<any>(this.baseUrl + 'user/remove/favorite/' + id, { headers: this.createHeader() });
  }


}

