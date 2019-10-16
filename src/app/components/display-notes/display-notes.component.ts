import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { ViewService } from 'src/app/service/view.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  direction = 'row';
  @Input() notes = [];

  constructor(private noteService: NoteService,
              private viewService: ViewService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
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
  onRemoveReminder(note: any) {
    this.noteService.removeReminder(note.noteId)
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
      });

  }
}
