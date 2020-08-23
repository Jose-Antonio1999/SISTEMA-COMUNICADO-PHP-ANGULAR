import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  ngOnInit(): void {
  }

}
export class DialogElementsExampleDialog {}
