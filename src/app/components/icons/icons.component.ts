import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() noteInfo: any;
  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

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
    console.log('notes color: ' + this.noteInfo.color);
  }

  addReminder() {

  }
  addCollab() {

  }
  colorlens() {
    console.log('inside color lens');
  }
  addPhoto() {

  }
  archive() {
    console.log('notes before archived: ' + this.noteInfo.archived);
    this.noteInfo.archived = true;
    this.noteService.updateNote(this.noteInfo)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
        } else {
          console.log(response);
        }
        this.snackBar.open('Note was Archived.', 'Undo', { duration: 2500 })
      });
    console.log('notes after archived: ' + this.noteInfo.archived);
  }
  moreVert() {

  }

  setColor(colorHexCode: any) {
    this.noteInfo.color = colorHexCode;
    this.noteService.updateNote(this.noteInfo)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);
        } else {
          console.log(response);
        }
      });
  }
  onDelete() {
    this.noteInfo.trash = true;
    this.noteService.updateNote(this.noteInfo)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response);

        } else {
          console.log(response);
        }
        this.snackBar.open('Note was Deleted.', 'Undo', { duration: 2500 })
      });
  }
  onLabel() {

  }
  onToday() {

  }
  onTomorrow() {

  }
  onWeek() {

  }
}
