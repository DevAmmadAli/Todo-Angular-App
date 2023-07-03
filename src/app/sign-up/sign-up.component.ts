import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  signupProfile: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
    this.userService.signUp({ ...this.signupProfile.value }).subscribe(
      (res) => {
        this._snackbar.open('Signup Successfully.', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.router.navigate(['login']);
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
