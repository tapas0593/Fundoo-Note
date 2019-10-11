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
    return this.http.put(this.url +'update', note, httpOptions);
  }
}
