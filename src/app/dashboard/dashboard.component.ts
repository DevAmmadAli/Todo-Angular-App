import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isSideNavOpen: boolean = true;
  taskList!: ITask[];

  constructor(private taskService: TaskService) {
    this.getTask();
  }

  getTask() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.taskList = res.body.tasks;
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }
}
