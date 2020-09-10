import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ServiceMensajeService {

  constructor(private snackBar: MatSnackBar) { }

  mensaje(mensaje:String){
    this.snackBar.open(""+mensaje, "", {
      duration: 1500,
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }

}
