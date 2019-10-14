import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashNotes: any;
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getTrashedNotes()
      .subscribe((response: any) => {
        this.trashNotes = response.body;
      });
  }
}
