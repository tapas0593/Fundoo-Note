import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-reminder-notes',
  templateUrl: './reminder-notes.component.html',
  styleUrls: ['./reminder-notes.component.scss']
})
export class ReminderNotesComponent implements OnInit {

  notes = [];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getReminderNotes();
  }

  getReminderNotes() {
    this.noteService.getReminderNotes()
      .subscribe((response: any) => {
        console.log(response);
        this.notes = response.body;
      });
  }
}
