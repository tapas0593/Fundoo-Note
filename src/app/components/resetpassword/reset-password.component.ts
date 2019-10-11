import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/model/resetpassword.model';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  reset = new ResetPassword();
  invalidPassword = false;
  hide = true;
  token: string;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onReset() {
    this.userService.resetPassword(this.reset, this.token)
      .subscribe((response:any) => {
        console.log(response);
        console.log(this.token);
        if (response.statusCode === 202) {
          console.log(response);
          this.router.navigateByUrl("/login");
        } else {
          console.log(response);
        }
      })
  }

}
