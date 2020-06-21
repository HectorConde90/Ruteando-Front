import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GelocationService {

  constructor() { }

  setCurrentPosition() {
    navigator.geolocation.getCurrentPosition(params =>
      localStorage.setItem('coordinates', JSON.stringify([params.coords.latitude, params.coords.longitude])));

  }

  getCurrentPosition() {
    return JSON.parse(localStorage.getItem('coordinates'));
  }

}
