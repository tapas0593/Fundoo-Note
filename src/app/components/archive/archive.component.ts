import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archivedNotes = [];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getArchivedNotes();
  }
  getArchivedNotes() {
    this.noteService.getArchivedNotes()
      .subscribe((response: any) => {
        console.log(response);
        this.archivedNotes = response.body;
      });
  }
  receiveEvent(event) {
    this.getArchivedNotes();
  }
}
