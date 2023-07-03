import { Component } from '@angular/core';
import { FormBuilder, Form, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginProfile: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  login() {
    this.userService.login({ ...this.loginProfile.value }).subscribe(
      (res) => {
        this._snackbar.open('Login Successfull.', '', {
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
}
