import { Component } from '@angular/core';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/models/todo';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  taskProfile: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dueDate: [199999, [Validators.required]],
  });

  id: string = '';
  todo!: ITodo;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getTodo(this.id);
      }
    });
  }

  createTask() {
    this.todoService.createTodo({ ...this.taskProfile.value }).subscribe(
      (res) => {
        this._snackbar.open('Todo Created Successfully.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.router.navigate(['dashboard']);
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

  updateTask() {
    this.todoService
      .updateTodo(this.id, { ...this.taskProfile.value })
      .subscribe(
        (res) => {
          this._snackbar.open('Todo updated Successfully.', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 2000,
          });
          this.router.navigate(['dashboard']);
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

  getTodo(id: string) {
    this.todoService.getTodo(id).subscribe((res: any) => {
      this.todo = res.body;
      this.todo.dueDate = new Date(this.todo.dueDate);
      this.taskProfile.setValue({
        title: this.todo.title,
        description: this.todo.description,
        dueDate: this.todo.dueDate.toLocaleDateString(),
      });
    });
  }
}
