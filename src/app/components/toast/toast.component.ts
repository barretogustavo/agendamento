import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  close(): void {
    this.snackBar.dismiss();
  }
}
