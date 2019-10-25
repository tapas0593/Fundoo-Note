import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-collab-dialog',
  templateUrl: './collab-dialog.component.html',
  styleUrls: ['./collab-dialog.component.scss']
})
export class CollabDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CollabDialogComponent>,
    @Inject(MAT_DIALOG_DATA)private  data: any) { }

  ngOnInit() {
  }

}
