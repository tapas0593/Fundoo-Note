import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { ViewService } from 'src/app/service/view.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashNotes: [];
  direction = 'row';
  constructor(private noteService: NoteService, private viewService: ViewService, private snackBar: MatSnackBar) {
    this.viewService.currentView.subscribe(
      response =>
        this.change(response)
    );
    this.getTrashedNotes();
  }

  change(flag: boolean) {
    if (flag) {
      this.direction = 'column';
    } else {
      this.direction = 'row';
    }
  }

  ngOnInit() {
  }
  getTrashedNotes() {
    this.noteService.getAllNotes(true, false)
      .subscribe((response: any) => {
        this.trashNotes = response.body;
      });
  }
  onRestore(note: any) {
    note.trash = false;
    this.noteService.updateNote(note)
      .subscribe((response: any) => {
        console.log(response);
        this.getTrashedNotes();
        this.snackBar.open('Note successfully restored', 'Undo', { duration: 2500 });
      });
  }

  onDelete(note: any, tempId: any) {
    this.noteService.deleteNote(note.noteId)
      .subscribe((response: any) => {
        console.log(response);
        this.trashNotes.splice(tempId, 1);
        this.snackBar.open('Note successfully Deleted', 'Undo', { duration: 2500 });
      });
  }
}
