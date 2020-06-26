import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GelocationService } from 'src/app/services/gelocation.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{



  user: any;
  isLogged: boolean = false;
  navigator: Navigator;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private positionService: GelocationService) { }

  ngOnInit(): void {
    this.checkUser();
    this.getPosition();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

  }



  async getUser() {
    this.user = await this.userService.getUser();
  }


  checkUser(): void {
    this.isLogged = this.loginService.getLogged();
    if (this.isLogged) { this.getUser(); }
  }


  onLogOut() {
    this.loginService.logOut();
    this.router.navigate(['/home/routes']);
    this.isLogged = false;
  }

  getPosition() {
    if (localStorage.getItem('coordinates') == null) {
     if (navigator.geolocation) {
      this.positionService.setCurrentPosition();
    }
   }


  }
}
