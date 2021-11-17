import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../../shared/models/User/Cliente';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.scss'],
})
export class LogrosComponent implements OnInit {
  logros: any[] = [];

  cliente: Cliente;
  constructor() {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) this.cliente = JSON.parse(user);
    this.logros = this.cliente.logro;
  }
}
