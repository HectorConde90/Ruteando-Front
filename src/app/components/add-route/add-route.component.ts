import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
declare let L;

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  markerArray: any;
  layerGroup: any;
  newRoute: FormGroup;
  latlangs: any;
  control: boolean = false;

  constructor(private userService: UserService, private route: Router) {

    this.newRoute = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
      coordinates: new FormControl('')
    });

    // Variables de los mapas


    this.markerArray = [];

  }





  ngOnInit(): void {
    this.map();
  }


  async addRoute() {
    this.newRoute.value['coordinates'] = this.markerArray;
    await this.userService.newRoute(this.newRoute.value);
    this.route.navigate(['/home/accountroutes/myroutes/add_successfully']);

  }




  map() {
    // Mapa
    const map = L.map('mymap').setView([42.09822241118974, -5.984687339184343], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiaGVjdG9yY29uZGUiLCJhIjoiY2tiZjhoYmNvMHQxYzMwcG10ZW1jZGpyZiJ9.D7w5eUICLTBHq9Y2pVcaZQ'
    }).addTo(map);



    this.layerGroup = L.layerGroup().addTo(map);

    map.on('click', (e) => {
      const poplocation = e.latlng;

      const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      marker.addTo(this.layerGroup);

      const coordinatesMap = [marker.getLatLng().lat, marker.getLatLng().lng];
      this.markerArray.push(coordinatesMap);


      drawLine(this.markerArray);



    });
    const drawLine = (marray) => {
      this.control = true;
      const polyline = L.polyline(marray, { color: 'yellow' }).addTo(map);
      polyline.addTo(this.layerGroup);

  }


  }



}

