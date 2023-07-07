import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  taskList!: ITask[];
  userName: string = '';

  constructor(
    private taskService: TaskService,
    private _snackbar: MatSnackBar
  ) {
    this.getTask();
  }

  ngOnInit(): void {}

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

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      (res) => {
        this._snackbar.open('Task Deleted Successfully.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.getTask();
      },
      ({ error }) => {
        this._snackbar.open(error.message, 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }
}
