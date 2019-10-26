import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CollaboratorDTO } from '../model/collaboratorDTO';

const httpOptions =
{
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "jwt_token": localStorage.getItem("token")
  })
};
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private url = 'http://localhost:8080/fundoo/note/';

  constructor(private http: HttpClient) { }

  addCollaborator(collabDTO: CollaboratorDTO) {
    return this.http.post(this.url + 'addCollaborator', collabDTO, httpOptions);
  }

  removeCollaborator(collabDTO: CollaboratorDTO) {
    return this.http.post(this.url + "removeCollaborator", collabDTO, httpOptions);
  }
}
