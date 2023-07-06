import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/models/task';
import { IUser } from 'src/app/models/user';
import { SideNavService } from 'src/app/services/side-nav.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  taskList!: ITask[];
  sideNavOpenState: boolean = false;
  userName: string = '';

  constructor(
    private taskService: TaskService,
    private sideNavService: SideNavService,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {
    this.getLoginUser();
    this.getTask();
    this.sideNavService.sideNavOpen$.subscribe((res) => {
      this.sideNavOpenState = res;
    });
  }

  ngOnInit(): void {
    this.getLoginUser();
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

  openCloseSideNav() {
    this.sideNavOpenState = !this.sideNavOpenState;
    this.sideNavService.sideNavEvent(this.sideNavOpenState);
  }

  getLoginUser() {
    this.userService.getLoginUser().subscribe((res: any) => {
      console.log(res);

      this.userName = `${res.body.firstName} ${res.body.lastName}`;
    });
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

  logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['login']);
  }
}
