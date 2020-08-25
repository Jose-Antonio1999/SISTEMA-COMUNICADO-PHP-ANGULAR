import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceMensajeService } from '../Service/service-mensaje.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog, private ruta:Router,private spinner: NgxSpinnerService,private me:ServiceMensajeService) {

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
  sal(){
    this.me.mensaje("gdfgdf")
  }

}
export class DialogElementsExampleDialog {}
