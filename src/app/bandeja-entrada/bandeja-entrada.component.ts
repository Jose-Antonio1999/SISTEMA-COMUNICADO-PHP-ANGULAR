import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceMensajeService } from '../Service/service-mensaje.service';
import { PeticionService } from '../Service/peticion.service';
import { Comunicado } from '../class/Comunicado';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {

  listaMensajes = new Array<Comunicado>();
  mVacio:boolean = false
  //Datos a mostrar mensaje
  tipo:String
  fecha:String
  asunto:String
  contenido:String
  valorBusqueda:String = ''
  mensajeVisible:boolean = true
  data:String
  id_personal:any
  constructor(private snackBar: MatSnackBar, private inject:ServiceMensajeService, private injectM:PeticionService) {

    this.data = localStorage.getItem('DNID')
    //listamos comunicados por personal de acuerdo al DNI
    this.injectM.ListaComunicadosDelDocente(this.data).subscribe((res)=>{
        if(res.length==0){
          this.mVacio = true
        }else{
          this.listaMensajes = res
        }
    })

  }

  ngOnInit(): void {
  }

  recortarMensaje(mensaje:String):String{
    if(mensaje.length<=150){
      return mensaje;
    }else{
      return mensaje.substr(0,150);
    }
  }

  verMensaje(i:number){
    this.tipo = this.listaMensajes[i].tipo_comunicado
    this.asunto = this.listaMensajes[i].asunto
    this.contenido = this.listaMensajes[i].contenido
    this.fecha = this.listaMensajes[i].fecha
  }

  eliminarMensaje(i:number){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro de eliminar el comunicado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        //eliminar comunicado de la base de datos
        this.injectM.EliminarMensaje(this.listaMensajes[i].id_Comunicado).subscribe((respuesta)=>{
          //eliminar comunicado del array
          this.listaMensajes.splice(i,1);
          if(this.listaMensajes.length==0){
            this.mVacio = true
          }
        })

        swalWithBootstrapButtons.fire(
          'Comunicado eliminado!',
          'Su comunicado a sido eliminado',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu comunicado no ha sido eliminado',
          'error'
        )
      }
    })

  }

  buscarMensajeDos(){
    if(this.valorBusqueda.length==1){
      this.injectM.ListaComunicados().subscribe((res)=>{
        this.listaMensajes = res
        this.mVacio = false
      })
    }else{
      this.injectM.buscarComunicado(this.valorBusqueda as any).subscribe((res)=>{
        this.listaMensajes = res
        if(res.length == 0){
          this.mVacio = true
        }else{
          this.mVacio = res
          this.mVacio = false
        }
      })
    }
  }

}
