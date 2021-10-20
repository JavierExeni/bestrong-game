import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebar_open: boolean = true;

  arrow1: boolean = false;
  arrow2: boolean = false;
  arrow3: boolean = false;

  value: number = 20;


  constructor() { }

  ngOnInit(): void {
  }

  changeEventBtn() {
    this.sidebar_open = !this.sidebar_open;
    console.log(this.sidebar_open);
  }

  dropdown(tipo: number) {
    switch (tipo) {
      case 1:
        this.arrow1 = !this.arrow1;
        break;
      case 2:
        this.arrow2 = !this.arrow2;
        break;
      case 3:
        this.arrow3 = !this.arrow3;
        break;
    }
  }

  validar(){
    /*if(this.auth.getUser()){
      return true;
    }
    return false;*/
  }

}
