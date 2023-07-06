import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

export enum snackBarType {
  success = 'success',
  error = 'error',
  warning = 'warning',
}

const snackBarIcon = {
  success: 'done',
  error: 'report_problem',
  warning: 'error_outline',
};

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackbar: MatSnackBar) {}

  openSnackBar(message: string, action: string, type: snackBarType) {
    this._snackbar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        action,
        icon: snackBarIcon[type],
        snackbar: this._snackbar,
      },
      panelClass: `${type}-snackbar`,
      duration: 2000,
    });
  }
}
