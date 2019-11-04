import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { CollaboratorDTO } from 'src/app/model/collaboratorDTO';
import { CollaboratorService } from 'src/app/service/collaborator.service';

@Component({
  selector: 'app-collab-dialog',
  templateUrl: './collab-dialog.component.html',
  styleUrls: ['./collab-dialog.component.scss']
})
export class CollabDialogComponent implements OnInit {

  userInfos: any[];
  userId: bigint;
  userInfoList = [];
  constructor(private userService: UserService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CollabDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private collaboratorService: CollaboratorService) {
    this.userInfos = data.collabUserInfo;
  }

  ngOnInit() {
  }

  getUser(emailId: string) {
    this.userService.getUserByEmailId(emailId).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          this.userId = response.body;
        }
      }
    );
    return this.userId;
  }

  addCollab() {
    let collabDTO = new CollaboratorDTO();
    collabDTO.noteId = this.data.note.noteId;
    collabDTO.sharedToUserId = this.userId;
    console.log(collabDTO);
    this.collaboratorService.addCollaborator(collabDTO)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessage, '', { duration: 3000 });
        } else {
          this.snackBar.open('User not present', '', { duration: 3000 });
        }
      });
  }
  removeCollab(emailId: string) {
    this.userInfoList.push(this.userInfos.filter((userInfo: any) => userInfo.emailId === emailId).pop());
    this.userInfos = this.userInfos.filter((userInfo: any) => userInfo.emailId !== emailId);
    console.log(this.userInfoList);

  }
  save() {
    for (let userInfo of this.userInfoList) {
      console.log('Collaborator DTO in save()' + this.data.note.noteId + '->' + userInfo.emailId);
      this.collaboratorService.removeCollaborator(this.data.note.noteId, userInfo.emailId).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.snackBar.open('Collaborator saved',  '', { duration: 3000 })
            console.log(response);
          } else {
            this.snackBar.open('Collaborator not saved',  '', { duration: 3000 })
            console.log(response);
          }
        }
      );
    }
  }
}