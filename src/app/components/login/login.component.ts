import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/model/login.model';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = new Login();

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onLogin() {
    return this.userService.login(this.login)
      .subscribe(response => {
        console.log(response);
        console.log('status code= ' + response.statusCode);
        if (response.statusCode === 200) {
          console.log(response);
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('email', response.body.emailId);
          localStorage.setItem('firstName', response.body.firstName);
          localStorage.setItem('lastName', response.body.lastName);
          this.router.navigateByUrl('/dashboard');
          console.log('Success login');
        } else {
          console.log('Login failed');
        }
      });
  }


}
