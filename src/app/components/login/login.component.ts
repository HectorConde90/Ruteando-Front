import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;


  constructor(private loginService: LoginService, private route: Router) {
    this.login = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
        ]),


        password: new FormControl('', [
          Validators.required,
        ])
      }
    );
  }

  ngOnInit(): void {
  }


  async  userLogin() {
    // console.log(this.login.value);
    const token = await this.loginService.login(this.login.value);
    await this.loginService.setToken(token);
    this.route.navigate(['/home']);

  }

}
