import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/service/view.service';
import { MatDialog } from '@angular/material';
import { EditLabelComponent } from '../edit-label/edit-label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  isGrid = true;
  labels: Label[];
  email: string;
  fullName: string;
  constructor(private viewService: ViewService, private labelService: LabelService, private router: Router, private dialog: MatDialog) {
    this.email = localStorage.getItem('email');
    this.fullName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    console.log('inside dashboard const');

  }

  ngOnInit() {
    this.getLabels();
    console.log('inside dashboard init');
    
  }

  changeView() {
    this.isGrid = !this.isGrid;
    this.viewService.changeView();
    console.log(this.isGrid);
    return this.isGrid;
  }

  getLabels() {
    this.labelService.getLabels().subscribe(
      (response: any) => {
        this.labels = response.body;
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
  onEditLabels() {
    const dialogRef = this.dialog.open(EditLabelComponent, {
      width: '315px',
      data: this.labels,
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
