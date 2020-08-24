import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private ruta:Router,private spinner: NgxSpinnerService) {

  }
  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  ngOnInit(): void {
  }
  salir(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        localStorage.removeItem('user');
        this.ruta.navigateByUrl('')
      }, 2000);
  }

}
export class DialogElementsExampleDialog {}
