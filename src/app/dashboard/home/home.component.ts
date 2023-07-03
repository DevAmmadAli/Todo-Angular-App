import { Component, OnInit } from '@angular/core';
import { ITodo } from 'src/app/models/todo';
import { IUser } from 'src/app/models/user';
import { SideNavService } from 'src/app/services/side-nav.service';
import { TodoService } from 'src/app/services/todo.service';
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
  toDoList!: ITodo[];
  sideNavOpenState: boolean = false;
  userName: string = '';

  constructor(
    private todoService: TodoService,
    private sideNavService: SideNavService,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {
    this.getLoginUser();
    this.getToDo();
    this.sideNavService.sideNavOpen$.subscribe((res) => {
      this.sideNavOpenState = res;
    });
  }

  ngOnInit(): void {
    this.getLoginUser();
  }

  getToDo() {
    this.todoService.getTodos().subscribe(
      (res: any) => {
        this.toDoList = res.body.todos;
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

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(
      (res) => {
        this._snackbar.open('Todo Deleted Successfully.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.getToDo();
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
