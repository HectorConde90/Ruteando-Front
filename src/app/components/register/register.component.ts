import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: FormGroup;
  constructor(private registerService: RegisterService,private router: Router) {
    this.newUser = new FormGroup({
        name: new FormControl('', [
        Validators.required,
        ]),
        last_name: new FormControl('', [
        Validators.required,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/),
        ]),
        password: new FormControl('', [
          Validators.required,
        ]),

    })
   }

  ngOnInit(): void {
  }

  async newRegister() {

    await this.registerService.register(this.newUser.value);
    this.router.navigate(['/login']);

    // console.log(res);

  }
}
