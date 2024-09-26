import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>) {}

  ngOnInit() {}
}
