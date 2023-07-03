import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { SideNavService } from 'src/app/services/side-nav.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() toDoList!: ITodo[];
  sideNavOpenState: boolean = true;

  @Output() openSideNav = new EventEmitter();

  constructor(public sideNavService: SideNavService) {
    this.sideNavService.sideNavOpen$.subscribe((res) => {
      if (res) {
        this.openCloseSideNav();
      }
    });
  }

  ngOnInit(): void {}

  openCloseSideNav() {
    this.openSideNav.emit();
  }
}
