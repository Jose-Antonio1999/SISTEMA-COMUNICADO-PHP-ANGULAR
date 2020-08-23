import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
