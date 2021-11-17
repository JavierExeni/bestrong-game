import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinaService } from '../../core/services/workout/rutina.service';
import { Rutina } from '../../shared/models/Workout/Rutina';
@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
})
export class ClaseComponent implements OnInit {
  nivel_id!: number;

  rutina: Rutina;

  constructor(
    private route: Router,
    private route_param: ActivatedRoute,
    private rutinaService: RutinaService
  ) {}

  ngOnInit(): void {
    this.route_param.params.subscribe((params) => {
      console.log(params['id']);
      this.nivel_id = params['id'];
      this.obtenerRutina();
    });
  }

  obtenerRutina() {
    this.rutinaService
      .getRutinasByNivel(this.nivel_id)
      .subscribe((res: any) => {
        this.rutina = res[0];
      });
  }

  irLeccion() {
    this.route.navigate(['/principal/leccion/', this.nivel_id]);
  }
}
