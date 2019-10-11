import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  isGrid = true;
  subject = new Subject();
  constructor() { }

  getView() {
    this.changeView();
    return this.subject.asObservable();
  }
  changeView() {
    if (this.isGrid) {
      this.subject.next({ data: 'row' });
    } else {
      this.subject.next({ data: 'column' });
    }
    this.isGrid = !this.isGrid;

  }
}
