import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

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
    MatDialogModule
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
    MatDialogModule
  ]
})
export class MaterialModule { }
