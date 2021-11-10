import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducers';
import {
  setBodyRest,
  crearBodyType,
} from '../../../../store/actions/bodyinfo.actions';
import { BodyType } from '../../../models/User/BodyInfo';
import { Cliente } from 'src/app/shared/models/User/Cliente';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'calculo-calorico',
  templateUrl: './calculo-calorico.component.html',
  styleUrls: ['./calculo-calorico.component.scss'],
})
export class CalculoCaloricoComponent implements OnInit, OnDestroy {
  @Output() seleccion = new EventEmitter<boolean>();
  TiposGastos: { opcion: string; factor: number }[] = [
    {
      opcion: 'Poco o ningún ejercicio fisico',
      factor: 1.2,
    },
    {
      opcion: 'Ejercicio Ligero (1-3 sesiones por semana)',
      factor: 1.375,
    },
    {
      opcion: 'Ejercicio Moderado (3-5 sesiones por semana)',
      factor: 1.55,
    },
    {
      opcion: 'Ejericio Fuerte (6-7 sesiones por semana)',
      factor: 1.725,
    },
    {
      opcion: 'Ejericio Muy Fuerte (8+ sesiones por semana)',
      factor: 1.9,
    },
  ];

  mb: number = 0;

  genero: any;

  formBody!: FormGroup;

  boydFinal!: BodyType;

  bodySubs!: Subscription;

  cliente?: Cliente;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.bodySubs = this.store
      .select('bodyInfo')
      .subscribe(({ altura, body_type, calorias, peso, objetivo }) => {
        if (
          altura != null &&
          body_type != null &&
          calorias != null &&
          peso != null &&
          objetivo != null
        ) {
          this.boydFinal = new BodyType(
            altura,
            peso,
            calorias,
            body_type,
            objetivo
          );
        }
      });
    this.cargar();
  }

  ngOnDestroy(): void {
    this.bodySubs.unsubscribe();
  }

  cargar() {
    let user = localStorage.getItem('user');
    if (user) this.cliente = JSON.parse(user);
    console.log(this.cliente);
    this.formBody = this.fb.group({
      peso: [, Validators.required],
      altura: [, Validators.required],
      edad: [, Validators.required],
      genero: [this.cliente?.genero.toString(), Validators.required],
    });
  }

  calcular(options: MatListOption[]) {
    let { peso, altura, edad, genero } = this.formBody.value;
    console.log(this.formBody.value);
    // Calculo Hombres
    if (genero == 0) {
      let paso1 = 10 * peso;
      let paso2 = 6.25 * altura;
      let paso3 = 5 * edad;
      this.mb = paso1 + paso2 - paso3 + 5;
    } else {
      let paso1 = 10 * peso;
      let paso2 = 6.25 * altura;
      let paso3 = 5 * edad;
      this.mb = paso1 + paso2 - paso3 - 161;
    }
    console.log(options.map((o) => o.value));
    let factor = options.map((o) => o.value)[0].factor;

    this.mb = this.mb * factor;

    this.store.dispatch(
      setBodyRest({ altura, peso, calorias: this.mb, objetivo: 0 })
    );
  }

  next() {
    this.store.dispatch(crearBodyType({ body: this.boydFinal }));
    this.seleccion.emit(false);
  }
}
