import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnado',
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.css']
})
export class AlumnadoComponent implements OnInit {

  escogeOption:boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  optionPadres(){
    this.escogeOption = false
  }
  optionAlumnos(){
    this.escogeOption = true
  }



}
