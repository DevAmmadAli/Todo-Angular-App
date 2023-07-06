import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ITask } from 'src/app/models/task';
import { SideNavService } from 'src/app/services/side-nav.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() taskList!: ITask[];
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
