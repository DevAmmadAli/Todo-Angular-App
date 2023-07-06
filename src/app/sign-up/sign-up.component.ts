import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    firstName: ['', [Validators.required, Validators.maxLength(12)]],
    lastName: ['', [Validators.required, Validators.maxLength(12)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')
        ),
        Validators.minLength(8),
        Validators.maxLength(12),
        ,
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  signUp() {
    if (this.signupProfile.valid) {
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

  getFormControl(name: string) {
    return this.signupProfile.get(name) as FormControl;
  }
}
