import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  @Output() seleccion = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('noBody', 'false');
  }

  next(){
    this.seleccion.emit(false);
  }

}
