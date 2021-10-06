import { Component, OnInit } from '@angular/core';
import { WAY } from '../../Enums';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  open: boolean = true;

  presentation: boolean = true;

  OnWay: number = WAY.PRESENTATION;

  WAY = WAY;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.open = !this.open;
  }

  next(){
    this.OnWay += 1;
  }

}
