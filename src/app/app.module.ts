import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgot-password.component';
import { ResetPasswordComponent } from './components/resetpassword/reset-password.component';
import { VerifyUserComponent } from './components/verifyuser/verify-user.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LabelService } from './service/label.service';
import { AddnoteComponent } from './components/addnote/addnote.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteService } from './service/note.service';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { ViewService } from './service/view.service';
import { MaterialModule } from './material-module/material.module';
import { EditLabelComponent } from './components/edit-label/edit-label.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyUserComponent,
    ToolbarComponent,
    AddnoteComponent,
    NotesComponent,
    TrashComponent,
    ArchiveComponent,
    UpdateNoteComponent,
    EditLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [UpdateNoteComponent],
  providers: [UserService, LabelService, NoteService, ViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
