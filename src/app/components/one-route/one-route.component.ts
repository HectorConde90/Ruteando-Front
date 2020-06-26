import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/services/routes.service';
import { ActivatedRoute } from '@angular/router';
import '../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { UserService } from 'src/app/services/user.service.js';
import { LoginService } from 'src/app/services/login.service.js';
import { Location } from '@angular/common';
declare let L;


@Component({
  selector: 'app-one-route',
  templateUrl: './one-route.component.html',
  styleUrls: ['./one-route.component.css']
})
export class OneRouteComponent implements OnInit {
  user: any;
  route: any;
  userFavoritesRoutes: any;
  constructor(
    private routeService: RoutesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService,
    private location: Location) {

    this.route = {};
  }

  ngOnInit(): void {
    this.getOneRoute();
    if (this.loginService.getLogged()) { this.getUser(); }
  }

  async getOneRoute() {
    // Peticion de la ruta
    let routeId: string;
    this.activatedRoute.params.subscribe(params => routeId = params.id);
    this.route = await this.routeService.getOneRoute(routeId).toPromise();
    // console.log(this.route)
    this.map();

  }

  onNavigate() {
    window.open('https://maps.google.com/?q=' + this.route.location_coordinates[0] + ',' + this.route.location_coordinates[1], '_blank');
  }

  async addFavorites(event) {
    const routeId = { id: event.target.dataset.id };
    await this.userService.addFavoriteRoute(routeId);
    this.getUser();
  }

  async getUser() {
    this.user = await this.userService.getUser();
    this.userFavoritesRoutes = this.user.favorite_routes;

  }

  goBack() {
    this.location.back();
  }

  map() {

    // Mapa
    const map = L.map('mymap').setView([this.route.coordinates[0][0], this.route.coordinates[0][1]], 16);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVjdG9yY29uZGUiLCJhIjoiY2tiZjhoYmNvMHQxYzMwcG10ZW1jZGpyZiJ9.D7w5eUICLTBHq9Y2pVcaZQ'
    }).addTo(map);


    // Linea de la ruta
    L.polyline(this.route.coordinates, { color: 'orange' }).addTo(map);
    // Marcadores

    L.marker([this.route.coordinates[0][0], this.route.coordinates[0][1]]).addTo(map);




}




}
