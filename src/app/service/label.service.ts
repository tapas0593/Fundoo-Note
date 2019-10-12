import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Label } from '../model/label.model';

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
  createLabel(label: any): any {
    return this.http.post(this.url + 'create', label, httpOptions);
  }
  updateLabel(label: any): any {
    return this.http.put(this.url + 'edit', label, httpOptions);
  }
  deleteLabel(labelId: bigint) {
    return this.http.delete(this.url + 'delete/' + labelId, httpOptions);
  }
}