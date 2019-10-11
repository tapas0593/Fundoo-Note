import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  emailId: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onForgot() {
    return this.userService.forgotPassword(this.emailId)
    .subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/login');
    })
  }

}
