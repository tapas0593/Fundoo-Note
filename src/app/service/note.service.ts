import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', jwt_token: localStorage.getItem('token') }) };

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private url = 'http://localhost:8080/fundoo/note/';
  constructor(private http: HttpClient) { }

  public createNote(note: any): any {
    return this.http.post(this.url + 'create', note, httpOptions);
  }
  public getAllNotes() {
    return this.http.get(this.url + 'getnotes', httpOptions);
  }
  public updateNote(note: any) {
    return this.http.put(this.url + 'update', note, httpOptions);
  }
  public deleteNote(noteId: bigint) {
    return this.http.delete(this.url + 'delete/' + noteId, httpOptions);
  }
  public getArchivedNotes() {
    return this.http.get(this.url + 'getArchivedNote', httpOptions);
  }
  public getTrashedNotes() {
    return this.http.get(this.url + 'getTrashedNote', httpOptions);
  }
  public getReminderNotes() {
    return this.http.get(this.url + 'getReminderNotes', httpOptions);
  }
  public addReminder(noteId: bigint, reminderDate: string) {
    return this.http.get(this.url + 'addReminder/' + noteId + '?reminderDate=' + reminderDate, httpOptions);
  }
  public removeReminder(noteId: bigint) {
    return this.http.get(this.url + 'removeReminder/' + noteId, httpOptions);
  }
}
