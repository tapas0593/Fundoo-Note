import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { UpdateNoteService } from 'src/app/service/update-note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  allNotes  =[];
  notes = [];
  pinnedNotes = [];
  constructor(private noteService: NoteService,
    private updateService: UpdateNoteService) {
    // this.updateService.changeUpdate(false, false).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this.allNotes = response.body;
    //     this.notesFilter();
    //   }
    // )
  }

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

  notesFilter() {
    this.pinnedNotes = [];
    this.notes = [];
    this.allNotes.filter(note => note.note.pin === true).map(note => this.pinnedNotes.push(note));
    this.allNotes.filter(note => note.note.pin === false).map(note => this.notes.push(note));
    console.log("After filter");
    console.log(this.pinnedNotes.length);
    console.log(this.notes);
  }
}
