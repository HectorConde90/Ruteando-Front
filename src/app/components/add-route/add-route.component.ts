import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare let L;

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  @ViewChild('map') mapContainer: ElementRef;

  markerArray: any;
  layerGroup: any;
  newRoute: FormGroup;
  latlangs: any;
  control: boolean = false;

  constructor(private userService: UserService, private route: Router, private location: Location) {

    this.newRoute = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(140)
      ]),
      coordinates: new FormControl(''),
      distance: new FormControl('', [
        Validators.pattern(/^[0-9]*(\.)?[0-9]+$/)
      ]),
      altitude: new FormControl('', [
        Validators.pattern(/^(\-)?\d*(\.\d+)?$/)
      ]),
      difficulty: new FormControl('',
        Validators.required
      ),
      circular: new FormControl('',
        Validators.required
      ),
      location: new FormControl('',
        Validators.required
      ),
      itinerary: new FormControl('')

    });

    // Variables de los mapas


    this.markerArray = [];

  }





  ngOnInit(): void {
    this.map();
  }


  async addRoute() {
    this.newRoute.value['coordinates'] = this.markerArray;
    const res = await this.userService.newRoute(this.newRoute.value);
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

  removeMarkers() {
    this.mapContainer.nativeElement.innerHTML = '';
    this.mapContainer.nativeElement.innerHTML = '<div style="height: 500px; width: 100%;" class="mymap" id="mymap"><h2></h2></div>';

    this.markerArray = [];
    this.map();
  }


}

