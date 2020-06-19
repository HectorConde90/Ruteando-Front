import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/routes.service';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  arrRoutes: any;
  user: any;
  userFavoritesRoutes: any;
  constructor(private routes: RoutesService,private userService: UserService,private loginService: LoginService) {
    this.arrRoutes = [];
  }

  ngOnInit(){
    this.getAllRoutes();
    if (this.loginService.getLogged()) { this.getUser(); }


  }

  getAllRoutes() {
    this.routes.getAllRoutes().subscribe(routes => this.arrRoutes = routes);
  }


  async addFavorites(event) {
    const routeId = {id: event.target.dataset.id};
    await this.userService.addFavoriteRoute(routeId);
    this.getUser();
  }

  async getUser() {
    this.user = await this.userService.getUser();
    this.userFavoritesRoutes = this.user.favorite_routes;
    console.log(this.userFavoritesRoutes);

  }

  disableButton(route_id) {
    // arr rutas para id de la ruta
    // el id del user
    // las ids de las rutas favoritas del user

    // si el id del user = al id del user_id de la ruta o alguna de las id de favoritas return true

    // this.userFavoritesRoutes.find(route => { if (route_id == route) return true })
    console.log(this.userFavoritesRoutes.forEach(id => { if (route_id == id) { return true } } ));


    return true;
  }
}
