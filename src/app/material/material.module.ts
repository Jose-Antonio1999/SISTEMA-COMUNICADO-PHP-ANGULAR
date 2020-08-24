import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
