import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.scss'],
})
export class ClaseComponent implements OnInit {
  nivel_id!: number;

  constructor(
    private route: Router,
    private route_param: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route_param.params.subscribe((params) => {
      console.log(params['id']);
      this.nivel_id = params['id'];
    });
  }

  irLeccion() {
    this.route.navigate(['/principal/leccion/', this.nivel_id]);
  }
}
