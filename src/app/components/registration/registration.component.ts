import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  user: User = new User();
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  isNameNull = true;

  constructor(private userService: UserService, private router: Router) { }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onRegister() {
    this.userService.registerUser(this.user)
      .subscribe(response => {
        if (response.statusCode === 200) {
          console.log(response);
          this.router.navigateByUrl("/login");
        } else {
          console.log(response);
        }
      })
  }
}
