import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../../../shared/models/User/Cliente';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog_ref: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: [this.cliente.first_name],
      last_name: [this.cliente.last_name],
      edad: [this.cliente.edad],
      genero: [this.cliente.genero],
      email: [this.cliente.email],
      username: [this.cliente.username],
      puntos: [this.cliente.puntos],
      altura: [],
      peso: [],
      calorias: [],
      body_type: [],
      objetivo: []
    })
  }
}
