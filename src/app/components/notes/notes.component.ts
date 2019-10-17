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
  notes = [];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getAllNotes();
  }

  getAllNotes() {
    this.noteService.getAllNotes()
      .subscribe((response: any) => {
        console.log(response);
        this.notes = response.body;
      });
  }
  receiveEvent(event) {
    this.getAllNotes();
  }
}
