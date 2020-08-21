import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-panel-director',
  templateUrl: './panel-director.component.html',
  styleUrls: ['./panel-director.component.css']
})
export class PanelDirectorComponent implements OnInit {
  @ViewChild('sideBar',{static:true}) sideBar:ElementRef
  contador:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  SideBar(){
    console.log(this.sideBar)
    if(this.contador == 1){
      this.sideBar.nativeElement.style.marginLeft="-350px"
      this.contador = 0;
    }else{
      this.sideBar.nativeElement.style.marginLeft="0%"
      this.contador = 1;
    }
  }

}
