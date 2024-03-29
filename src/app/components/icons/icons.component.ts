import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { LabelService } from 'src/app/service/label.service';
import { CollabDialogComponent } from '../collab-dialog/collab-dialog.component';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  formGroup: FormGroup;

  now = new Date();
  show = false;
  searchLabelName: string;
  @Input() noteInfo: any;
  @Output() updatedEvent = new EventEmitter<any>();
  labels: any;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar, private labelService: LabelService, private dialog: MatDialog) { }

  colorPalet = [
    [
      {
        name: 'white', hexcode: '#ffffff '
      },
      {
        name: 'light red', hexcode: '#f28b82'
      },
      {
        name: 'yellow', hexcode: '#fbbc04'
      },
      {
        name: 'lemonYellow', hexcode: '#fff475'
      },
    ],
    [
      {
        name: 'lightGreen', hexcode: '#ccff90'
      },
      {
        name: 'Pale Turquoise', hexcode: '#a7ffeb'
      },
      {
        name: 'lightBlue', hexcode: '#cbf0f8'
      },
      {
        name: 'Pale Cornflower Blue', hexcode: '#aecbfa'
      },
    ],
    [
      {
        name: 'Pale Purple', hexcode: '#d7aefb'
      },
      {
        name: 'Lavender Pink', hexcode: ' #fdcfe8 '
      },
      {
        name: 'beige', hexcode: '#e6c9a8 '
      }
      ,
      {
        name: 'Solitude', hexcode: '#e8eaed'
      }
    ],
  ];

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        labelName: new FormControl('')
      }
    );
    this.getLabels();
  }

  getLabels() {
    this.labelService.getLabels().subscribe(
      (response: any) => this.labels = response.body
    );
  }
  addReminder() {

  }
  setReminder(message: string) {
    let tempDate: any;
    let date: any;
    if (message === 'today') {
      tempDate = this.now;
    } else if (message === 'tomorrow') {
      tempDate = this.now.setDate(this.now.getDate() + 1);
    } else if (message === 'week') {
      tempDate = this.now.setDate(this.now.getDate() + 7);
    }

    date = formatDate(tempDate, 'yyyy-MM-ddT20:00:00', 'en-IND', '+5:30');
    this.noteService.addReminder(this.noteInfo.note.noteId, date)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
          this.noteInfo.note = response.body;
          // this.updatedEvent.emit(this.noteInfo);
        } else {
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
        console.log(response);
      });

  }

  addCollab() {

  }
  colorlens() {
    console.log('inside color lens');
  }
  addPhoto() {

  }
  archive() {
    console.log('notes before archived: ' + this.noteInfo.note.archived);
    this.noteInfo.note.archived = !this.noteInfo.note.archived;
    this.noteService.updateNote(this.noteInfo.note)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
          this.noteInfo.note = response.body;
          // console.log('event sent: ' + this.noteInfo);
          // this.updatedArchiveEvent.emit(this.noteInfo);
        } else {
          console.log(response);
        }
        const statusMessage = this.noteInfo.note.archived ? 'Note was Archived.' : 'Note was Unarchived.';
        this.snackBar.open(statusMessage, 'Undo', { duration: 2500 });
      });
    console.log('notes after archived: ' + this.noteInfo.note.archived);
  }

  moreVert() {

  }

  setColor(colorHexCode: any) {
    this.noteInfo.note.color = colorHexCode;
    this.noteService.updateNote(this.noteInfo.note)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
  onDelete() {
    this.noteInfo.note.trash = true;
    this.noteService.updateNote(this.noteInfo.note)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
        } else {
          console.log(response);
        }
        this.snackBar.open('Note was Deleted.', 'Undo', { duration: 2500 });
      });
  }
  onLabel() {

  }

  addLabelToNote(isChecked: boolean, labelId: any) {
    console.log(isChecked);
    if (isChecked) {
      this.noteService.addLabelToNote(labelId, this.noteInfo.note.noteId)
        .subscribe((response: any) => {
          console.log(response);
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        });
    } else {
      this.removeLabelFromNote(labelId, this.noteInfo.note.noteId);
    }
  }

  removeLabelFromNote(labelId: bigint, noteId: bigint) {
    this.noteService.removeLabelFromNote(labelId, noteId)
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode === 200) {
          this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
        }
      });
  }
  onSearchChange(searchValue: string) {
    if (searchValue !== '') {
      this.show = true;
      this.labels = this.labels.filter(label => label.labelName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
      this.searchLabelName = searchValue;
    } else {
      this.show = false;
      this.getLabels();
    }
  }

  createNewLabel($event) {
    this.labelService.createLabel(this.formGroup.value)
      .subscribe((response: any) => {
        if (response.statusCode === 201) {
          console.log(response);
          // this.snackBar.open(response.statusMessage, '', { duration: 2500 });
          this.addLabelToNote(true, response.body.labelId);
          this.getLabels();
        }
      });
  }

  openCollabDialog()
  { 
    console.log(this.noteInfo);
    
    const dialogRef = this.dialog.open(CollabDialogComponent, {
      width: '600px',
      data:this.noteInfo
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.updateService.changeUpdate(false,false);
    }); 
  }
}
