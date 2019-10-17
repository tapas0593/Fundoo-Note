import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { ViewService } from 'src/app/service/view.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { LabelService } from 'src/app/service/label.service';
import { Label } from 'src/app/model/label.model';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  direction = 'row';
  labels: Label[];
  @Input() notes = [];

  @Output() updatedEvent = new EventEmitter<any>();

  constructor(private noteService: NoteService,
              private viewService: ViewService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private labelService: LabelService) {
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
    this.getLabels();
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
        console.log(response.body);
        this.updatedEvent.emit(response.body);
        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
      });
  }
  getLabels() {
    this.labelService.getLabels().subscribe(
      (response: any) => this.labels = response.body
    );
  }

  addLabelToNote(event, labelId: bigint, noteId: bigint) {
    console.log('event data');
    console.log(event);
    this.noteService.addLabelToNote(labelId, noteId)
      .subscribe(
        (response: any) => {
          this.getLabels();
          // this.updateService.changeUpdate(false, false);
          this.snackBar.open(response.statusMessage, '', { duration: 2500});

        }
      );
  }
}
