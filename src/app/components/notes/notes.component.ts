import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { ViewService } from 'src/app/service/view.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  direction = 'row';
  notes = [];
  constructor(private noteService: NoteService, private viewService: ViewService, public dialog: MatDialog) { }

  ngOnInit() {
    this.viewService.getView().subscribe(
      (result: any) => {
        console.log('result:' + result);
        this.direction = result.data;
        console.log('direction: ' + this.direction);
      });
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes()
      .subscribe((response: any) => {
        console.log(response);
        this.notes = response.body;
      });
  }

  onUpdate(note: any): void {
    console.log('note-->', note);
    const dialogRef = this.dialog.open(UpdateNoteComponent, {
      width: '600px',
      height: 'auto',
      data: note,
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}