import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateNoteService {

  private notes = new BehaviorSubject([]);
  allNotes = this.notes.asObservable();
  private trashed: boolean = false;
  private archived: boolean = false;

  constructor(private noteService: NoteService) {

    this.noteService.getAllNotes(this.trashed, this.archived)
      .subscribe((response: any) => {
        this.notes.next(response);
      });
  }

  changeUpdate(trashed: boolean, archived: boolean) {
    this.archived = archived;
    this.trashed = trashed;

    this.noteService.getAllNotes(this.trashed, this.archived)
      .subscribe((response: any) => {
        this.notes.next(response);
      },
        error => {
          console.log(error);
        }
      )
    return this.allNotes;
  }
}
