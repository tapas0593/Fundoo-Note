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
  trashNotes: any;
  direction = 'row';
  constructor(private noteService: NoteService, private viewService: ViewService, private snackBar: MatSnackBar) { 
    this.viewService.currentView.subscribe(
      response =>
        this.change(response)
    );
  }

  change(flag: boolean) {
    if (flag) {
      this.direction = 'column';
    } else {
      this.direction = 'row';
    }
  }

  ngOnInit() {
    this.noteService.getTrashedNotes()
      .subscribe((response: any) => {
        this.trashNotes = response.body;
      });
  }
  onRestore(note: any) {
    note.trash = false;
    this.noteService.updateNote(note)
      .subscribe((response: any) => {
        console.log(response);
        this.snackBar.open('Note successfully restored', 'Undo', { duration: 2500 });
      });
  }

  onDelete(note: any) {
    this.noteService.deleteNote(note.noteId)
      .subscribe((response: any) => {
        console.log(response);
        this.snackBar.open('Note successfully Deleted', 'Undo', { duration: 2500 });
      });
  }
}
