import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatDividerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
