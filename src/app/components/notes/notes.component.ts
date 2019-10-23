import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';

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
    this.noteService.getAllNotes(false, false)
      .subscribe((response: any) => {
        console.log(response);
        this.notes = response.body;
      });
  }
  receiveEvent(event) {
    this.getAllNotes();
  }
}
