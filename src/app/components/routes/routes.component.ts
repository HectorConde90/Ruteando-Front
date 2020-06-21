import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/routes.service';
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
  difficulty: string;
  circular: string;
  location: string;
  range: number;
  pagesLimit: number;
  constructor(private routesService: RoutesService, private userService: UserService, private loginService: LoginService) {
    this.arrRoutes = [];
    this.pagesLimit = 0;
  }

  ngOnInit(){
    this.getAllRoutes(10);
    if (this.loginService.getLogged()) { this.getUser(); }


  }

  getAllRoutes(pages) {

    this.pagesLimit += pages;
    this.routesService.getAllRoutes(this.pagesLimit).subscribe(routes => this.arrRoutes = routes);
  }


  async addFavorites(event) {
    const routeId = {id: event.target.dataset.id};
    await this.userService.addFavoriteRoute(routeId);
    this.getUser();
  }

  async getUser() {
    this.user = await this.userService.getUser();
    this.userFavoritesRoutes = this.user.favorite_routes;
    // console.log(this.userFavoritesRoutes);

  }



  async searchMethod() {
    const search = [];

    if (this.difficulty != undefined) { search.push({ difficulty: this.difficulty }); }
    if (this.circular != undefined) {search.push({ circular: this.circular }); }
    if (this.location != undefined) {search.push({ location: this.location }); }

    if (this.range != undefined)
    {
      search.push(
        { location_coordinates: { $within: { $centerSphere: [JSON.parse(localStorage.getItem('coordinates')), this.range / 3963.192] } } }
      );
  }

    console.log(search);


    const searchedRoutes = await this.routesService.searchRoutes(search).toPromise();
    console.log(searchedRoutes);
    this.arrRoutes = searchedRoutes;

    this.difficulty = undefined;
    this.circular = undefined;
    this.location = undefined;



  }


}
