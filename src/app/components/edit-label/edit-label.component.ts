import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Label } from 'src/app/model/label.model';
import { LabelService } from 'src/app/service/label.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  labelName: string;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditLabelComponent>,
              @Inject(MAT_DIALOG_DATA) private labels: Label[],
              private labelService: LabelService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formGroup = new FormGroup(
      {
        labelName: new FormControl('')
      }
    );
  }
  createLabel() {
    if (this.formGroup.value.labelName !== '') {
      return this.labelService.createLabel(this.formGroup.value)
        .subscribe((response: any) => {
          this.getLabels();
          console.log(response);
          this.labels.push(response.body);
          console.log(this.labels);
          this.snackBar.open(response.statusMessage, 'Undo',
            {
              duration: 2500
            });
        });
    }
  }
  deleteLabel(labelId: bigint) {
    console.log(labelId);
    return this.labelService.deleteLabel(labelId)
      .subscribe((response: any) => {
        this.getLabels();
        this.snackBar.open(response.statusMessage, 'Undo',
          {
            duration: 2500
          });
      });

  }
  updateLabel(label: Label) {
    console.log(this.labelName);
    if (label.labelName !== this.labelName) {
      label.labelName = this.labelName;
      return this.labelService.updateLabel(label)
        .subscribe((response: any) => {
          if (response.statusCode === 200) {
            this.snackBar.open(response.statusMessage, 'Undo', { duration: 2500 });
          } else {
            this.snackBar.open(response.statusMessage, '', { duration: 2500 });
          }
          console.log(response);
        });
    }
  }
  focusInput(myInput) {
    myInput.focus();
  }
  onDone() {
    this.dialogRef.close();
  }

  getLabels() {
    this.labelService.getLabels()
      .subscribe((response: any) => { this.labels = response.body; });
  }
}
