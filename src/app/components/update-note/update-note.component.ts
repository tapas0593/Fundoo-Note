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
  public note: any;
  public fullNote: any;
  // labels: [];
  noteId = this.data.noteId;
  title = new FormControl(this.data.note.title);
  description = new FormControl(this.data.note.description);
  constructor(
    public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, private snackBar: MatSnackBar) {
    this.note = data.note;
    this.fullNote = data;
    // this.labels = data.labels;
  }

  ngOnInit() {
  }

  onClose() {
    console.log(this.note);
    this.noteService.updateNote(this.note)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        } else {
          console.log(response);
          this.snackBar.open('Note Updation Unsuccessful', 'Undo', { duration: 2500 });
        }
      });
    this.dialogRef.close(this.fullNote);
  }
  onRemoveReminder(note: any) {
    this.noteService.removeReminder(note.noteId)
      .subscribe((response: any) => {
        console.log(response.body);
        // this.updatedEvent.emit(response.body);
        if (response.statusCode === 200) {
          this.note = response.body;
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
      });
  }

  removeLabelFromNote(label: any, note: any, tempId: any) {
    this.noteService.removeLabelFromNote(label.labelId, note.noteId)
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode === 200) {
          note.labels.splice(tempId, 1);
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
      });
  }
}
