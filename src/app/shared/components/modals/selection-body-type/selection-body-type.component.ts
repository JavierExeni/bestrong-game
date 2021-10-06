import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'selection-body-type',
  templateUrl: './selection-body-type.component.html',
  styleUrls: ['./selection-body-type.component.scss']
})
export class SelectionBodyTypeComponent implements OnInit {
  @Output() seleccion = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  selected(){
    this.seleccion.emit(false);
  }

}
