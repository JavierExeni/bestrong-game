import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'presentation-body-type',
  templateUrl: './presentation-body-type.component.html',
  styleUrls: ['./presentation-body-type.component.scss']
})
export class PresentationBodyTypeComponent implements OnInit {
  @Output() seleccion = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  next(){
    this.seleccion.emit(false);
  }

}
