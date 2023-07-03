import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
  sideNavOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  sideNavOpen$ = this.sideNavOpen.asObservable();

  constructor() {}

  sideNavEvent(value: boolean) {
    this.sideNavOpen.next(value);
  }
}
