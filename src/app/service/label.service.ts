import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', jwt_token: localStorage.getItem('token') }) };

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private url = 'http://localhost:8080/fundoo/label/';

  constructor(private http: HttpClient) { }

  getLabels(): any {
    return this.http.get(this.url + 'getLabels', httpOptions);
  }
}
