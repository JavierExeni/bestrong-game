import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { AuthService } from '../../services/authentication/auth.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registro!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private user: UsuarioService
  ) {}

  ngOnInit(): void {
    this.registro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registrar() {
    let cliente: Cliente = {
      first_name: this.registro.get('nombre')!.value,
      last_name: this.registro.get('apellido')!.value,
      edad: this.registro.get('edad')!.value,
      email: this.registro.get('email')!.value,
      genero: this.registro.get('genero')!.value,
      password: this.registro.get('password')!.value,
      username: this.registro.get('username')!.value,
    };
    this.user.insertarUsuario(cliente).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
