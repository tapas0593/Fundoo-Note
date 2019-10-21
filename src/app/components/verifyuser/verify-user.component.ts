import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {
  token: string;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  verifyUser() {
    return this.userService.verifyUser(this.token)
    .subscribe((response: any) => {
      if(response.statusCode === 200) {
        console.log(response);
        this.router.navigateByUrl('/login');
      } else {
        console.log(response);
      }
    });
  }
}
