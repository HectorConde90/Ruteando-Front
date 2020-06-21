import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient, private loginService: LoginService) {
    
  }

  getAllRoutes(limit) {
    return this.http.get<any>(this.baseUrl + 'routes/' + limit);
  }

  getOneRoute(id) {
    return this.http.get<any>(this.baseUrl + 'routes/' + id);
  }

  searchRoutes(params) {
    return this.http.post<any>(this.baseUrl + 'routes/search', params);
  }


}
