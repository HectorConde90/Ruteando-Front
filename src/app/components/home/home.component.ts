import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  isLogged: boolean = false;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.checkUser();

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


}
