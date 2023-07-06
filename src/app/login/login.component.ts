import { Component } from '@angular/core';
import { FormBuilder, Form, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { SnackBarService, snackBarType } from '../services/snack-bar.service';

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
    private snackbarService: SnackBarService,
    private router: Router
  ) {}

  login() {
    if (this.loginProfile.valid) {
      this.userService.login({ ...this.loginProfile.value }).subscribe(
        (res) => {
          this.snackbarService.openSnackBar(
            'Login successfully.',
            'Ok',
            snackBarType.success
          );
          this.router.navigate(['dashboard']);
        },
        ({ error }) => {
          this.snackbarService.openSnackBar(
            error.message,
            'OK',
            snackBarType.error
          );
        }
      );
    }
  }

  getFormControl(name: string) {
    return this.loginProfile.get(name) as FormControl;
  }
}
