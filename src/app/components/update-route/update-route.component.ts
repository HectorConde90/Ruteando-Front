import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RoutesService } from 'src/app/services/routes.service';
declare let L;

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit {
  @ViewChild('map') mapContainer: ElementRef;
  route: any;
  routeUpdate: FormGroup;
  layerGroup: any;
  markerArray: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private routeService: RoutesService,
    private routeNavigate: Router,
    ) {


    this.routeUpdate = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      coordinates: new FormControl('')
    });

    this.markerArray = [];


   }

  ngOnInit(): void {
    this.getRoute();

  }


  async getRoute() {
    let routeId: string;
    this.activatedRoute.params.subscribe(params => routeId = params.id);
    this.route = await this.routeService.getOneRoute(routeId).toPromise();
    this.routeUpdate.patchValue({ title: this.route.title, description: this.route.description, coordinates: this.route.coordinates });
    this.map();



  }

  async updateRoute() {
    if (this.markerArray != '') {
      this.routeUpdate.value['coordinates'] = this.markerArray;
    }
    let routeId;
    this.activatedRoute.params.subscribe(id => routeId = id.id);
    const res = await this.userService.updateRoute(this.routeUpdate.value, routeId);

    this.routeNavigate.navigate(['/home/accountroutes/myroutes/updated_successfully']);



  }



  map() {
    // Mapa
    const map = L.map('mymap').setView([this.route.coordinates[0][0], this.route.coordinates[0][1]], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVjdG9yY29uZGUiLCJhIjoiY2tiZjhoYmNvMHQxYzMwcG10ZW1jZGpyZiJ9.D7w5eUICLTBHq9Y2pVcaZQ'
    }).addTo(map);

    L.polyline(this.route.coordinates, { color: 'brown' }).addTo(map);
    this.layerGroup = L.layerGroup().addTo(map);

    map.on('click', (e) => {
      const poplocation = e.latlng;



      const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      marker.addTo(this.layerGroup);

      const coordinatesMap = [marker.getLatLng().lat, marker.getLatLng().lng];
      this.markerArray.push(coordinatesMap);

      this.drawlineMethod(this.markerArray, map);



    });

  }

  drawlineMethod(marray, map) {
    const polyline = L.polyline(marray, { color: 'green' }).addTo(map);
    polyline.remove(this.layerGroup);
    polyline.addTo(this.layerGroup);
  }

  removeMarkers() {
    this.mapContainer.nativeElement.innerHTML = '';
    this.mapContainer.nativeElement.innerHTML = '<div style="height: 400px; width: 500px;" class="mymap" id="mymap"><h2></h2></div>';

    this.markerArray = [];
    this.map();
  }
}
