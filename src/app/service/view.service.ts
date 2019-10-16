import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private view = new BehaviorSubject(false);
  currentView = this.view.asObservable();

  private newView: boolean;

  constructor() {
  }

  changeView() {
    this.currentView.subscribe(
      response => this.newView = response
    );
    this.view.next(!this.newView);
  }
}
