import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {
  note: {};
  noteId = this.data.noteId;
  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);
  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, private snackbar: MatSnackBar) {
    this.note = data;
  }

  ngOnInit() {
  }

  onClose() {
    console.log(this.note);
    this.noteService.updateNote(this.note)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
          this.snackbar.open(response.statusMessage, 'Undo', { duration: 2500 });
        } else {
          console.log(response);
          this.snackbar.open('Note Updation Unsuccessful', 'Undo', { duration: 2500 });
        }
      });
    this.dialogRef.close();
  }
}
