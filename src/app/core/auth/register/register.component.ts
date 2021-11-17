import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { AuthService } from '../../services/authentication/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { RutinaService } from '../../services/workout/rutina.service';
import { Rutina } from '../../../shared/models/Workout/Rutina';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registro!: FormGroup;

  rutina: Rutina;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private user: UsuarioService,
    private rutinaService: RutinaService
  ) {}

  ngOnInit(): void {
    this.obtenerRutina();
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

  obtenerRutina() {
    this.rutinaService.getRutinaById(1).subscribe(
      (res: any) => {
        console.log(res);
        this.rutina = res;
      },
      (err) => {
        console.log(err);
      }
    );
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
        // obtenemos ID y lo ingresamos en la rutina 1
        console.log(res);
        this.rutina.user = [res.id];
        console.log(this.rutina);

        this.cargarUser();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarUser() {
    this.rutinaService
      .updateRutinaWithUser(this.rutina.id, this.rutina)
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: '¡Te has registrado correctamente!',
          });
          this.router.navigate(['login']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
