import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-own-routes',
  templateUrl: './own-routes.component.html',
  styleUrls: ['./own-routes.component.css']
})
export class OwnRoutesComponent implements OnInit {

  myRoutesActive: boolean = true;
  myFavoriteRoutesActive: boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  changeActive() {
    this.myFavoriteRoutesActive = !this.myFavoriteRoutesActive;
    this.myRoutesActive = !this.myRoutesActive;
  }
}
