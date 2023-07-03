import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isSideNavOpen: boolean = true;
  toDoList!: ITodo[];

  constructor(private todoService: TodoService) {
    this.getToDo();
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
}
