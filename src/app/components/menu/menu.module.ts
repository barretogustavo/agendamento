import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatToolbarModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
