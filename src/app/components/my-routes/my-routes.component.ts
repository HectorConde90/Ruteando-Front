import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RoutesService } from 'src/app/services/routes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.component.html',
  styleUrls: ['./my-routes.component.css']
})
export class MyRoutesComponent implements OnInit {
  myRoutes: any;
  newRoute: boolean = false;
  updatedAlert: boolean = false;
  removeAlert: boolean = false;
  addAlert: boolean = false;
  deleteRouteId: string;

  constructor(private userService: UserService, private routeService: RoutesService, private activatedRoute: ActivatedRoute) {
    this.myRoutes = [];
   }

  ngOnInit(): void {
    this.getMyRoutes();
    this.alerts();
  }

  getMyRoutes() {
    this.myRoutes = [];
    this.userService.getMyRoutes().subscribe(routes => this.myRoutes = routes);

  }

  async deleteRoute() {
    await this.userService.deleteRoute(this.deleteRouteId);
    const index = this.myRoutes.map(route => route._id).indexOf(this.deleteRouteId);
    this.myRoutes.splice(index, 1);
    this.removeAlert = true;
  }
  resetAlert() {
    this.removeAlert = false;
  }

  alerts() {
    let id;
    this.activatedRoute.params.subscribe(paramsId => id = paramsId.id);
    switch (id) {
      case 'updated_successfully':
        this.updatedAlert = true;
        break;
      case 'add_successfully':
        this.addAlert = true ;
        break;
      case 'remove_successfully':
        this.removeAlert = true;
        break;
      default:
        break;
    }
  }

 

}
