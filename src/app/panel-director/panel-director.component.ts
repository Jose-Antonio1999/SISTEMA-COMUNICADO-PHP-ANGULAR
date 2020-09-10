import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PeticionService } from '../Service/peticion.service';
import { Personal } from '../class/personal';
import { PdfMakeWrapper, Img } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-panel-director',
  templateUrl: './panel-director.component.html',
  styleUrls: ['./panel-director.component.css']
})
export class PanelDirectorComponent implements OnInit {
  @ViewChild('contenido',{static:true}) contenido:ElementRef
  opcionEscogida:string = "Bsalida"
  DatosUsuario = new Array<Personal>()
  NombreUserCurrent:String
  PerfilCurrect:Personal
  nombreUser:String
  constructor(private ruta:Router,private spinner: NgxSpinnerService, private inject:PeticionService) {
    if(localStorage.getItem('userDir')==null || localStorage.getItem('userDir')==""){
      this.ruta.navigateByUrl('Login')
    }else{
      this.inject.DatosUsuarioActual(localStorage.getItem('DNID')).subscribe((respuesta)=>{
        this.PerfilCurrect = respuesta[0]
        this.NombreUserCurrent = this.PerfilCurrect.nombre_personal
      })
    }
  }

  ngOnInit(): void {
  }
  BanSalida(){
    this.opcionEscogida = "Bsalida"
  }
  Lalumnos(){
    this.opcionEscogida = "Lalumnos"
  }
  Ldocentes(){
    this.opcionEscogida = "Ldocentes"
  }
  ListaPadres(){
    this.opcionEscogida = "Rpadres"
  }
  ListaBorradorres(){
    this.opcionEscogida = "Lborradores"
  }
  Perfil(){
    this.opcionEscogida = "Perfil"
  }

  salir(){
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        localStorage.removeItem('userDir');
        this.ruta.navigateByUrl('')
      }, 2000);
  }
  gen(){

    // Set the fonts to use
    /*
    PdfMakeWrapper.setFonts(pdfFonts);

    const pdf = new PdfMakeWrapper();

    pdf.add('<div><h1>hola</h1></div>');
    pdf.header("BELÉN DE OSMA Y PARDO");
    pdf.pageMargins(40)
    pdf.background("color")
    pdf.footer("SALUDOS")

    pdf.create().open();*/
    /*
    let doc = new jsPDF();

    let specialElement = {
      '#editor':function(element, renderer){
        return true;
      }
    }

    let contenido = this.contenido.nativeElement

    doc.fromHTML(contenido.innerHTML, 15, 15,{
      'width':100,
      'elementHandlers':specialElement
    })

    doc.save('test.pdf');
*/
  }


}
