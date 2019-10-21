import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/service/label.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-labeled-note',
  templateUrl: './labeled-note.component.html',
  styleUrls: ['./labeled-note.component.scss']
})
export class LabeledNoteComponent implements OnInit {
  labelName: string;
  labelId: bigint;
  notes: [];
  constructor(private labelService: LabelService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.labelName = params.get('labelName')
      console.log('inside ngOnInit ' + this.labelName);
      this.getLabel(this.labelName);
    });
  }
  getLabeledNotes() {
    this.labelService.getLabeledNotes(this.labelId)
      .subscribe((response: any) => {
        console.log(response);
        if (response.statusCode === 200) {
          this.notes = response.body;
        } else {
          this.notes= [];
        }
      });
  }
  getLabel(labelName: string) {
    return this.labelService.getLabel(labelName)
      .subscribe((response: any) => {
        if (response.statusCode === 302) {
          console.log('inside getlabel() ' + response);
          this.labelId = response.body.labelId;
          console.log('labelId is: ' + this.labelId);
          this.getLabeledNotes();
        }
      });
  }
  receiveEvent($event) {
    this.getLabeledNotes();
  }

}
