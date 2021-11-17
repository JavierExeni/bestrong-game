import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Cliente } from '../../shared/models/User/Cliente';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import Swal from 'sweetalert2';
import {
  cargarUsuarioSuccess,
  cargarUsuarioSuccessUpdate,
} from '../../store/actions/usuario.actions';
import { Subscription } from 'rxjs';
import { cargarRutina } from '../../store/actions/rutina.actions';
import { Rutina } from '../../shared/models/Workout/Rutina';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
}

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, AfterViewInit {
  @ViewChild('personaje', { static: false }) chpersonaje!: ElementRef;
  @ViewChild('mapa', { static: false }) map!: ElementRef;

  @ViewChild('sensei1', { static: false }) sensei1!: ElementRef;

  x = 80;
  y = 34;
  held_directions: string[] = [];
  speed = 2;

  directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
  };

  btnUp: boolean = false;
  btnDown: boolean = false;
  btnLeft: boolean = false;
  btnRight: boolean = false;

  has_cliente = false;

  cliente: Cliente;

  bodySubs: Subscription;

  nivel;

  rutina: Rutina;

  constructor(
    private route: Router,
    private store: Store<AppState>,
    private usuarService: UsuarioService
  ) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.goUp();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.goDown();
    }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.goRight();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.goLeft();
    }
  }

  ngAfterViewInit(): void {
    this.movement();
  }

  movement() {
    var pixelSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--pixel-size'
      )
    );
    let mainch = this.chpersonaje.nativeElement;
    const held_direction = this.held_directions[0];
    if (held_direction) {
      if (held_direction === this.directions.right) {
        this.x += this.speed;
      }
      if (held_direction === this.directions.left) {
        this.x -= this.speed;
      }
      if (held_direction === this.directions.down) {
        this.y += this.speed;
      }
      if (held_direction === this.directions.up) {
        this.y -= this.speed;
      }

      mainch.setAttribute('facing', held_direction);
      //character.setAttribute("facing", held_direction);
    }
    mainch.setAttribute('walking', held_direction ? 'true' : 'false');
    //character.setAttribute("walking", held_direction ? "true" : "false");

    //Limits (gives the illusion of walls)
    var leftLimit = -8;

    if (this.nivel != 1) {
      var rightLimit = 20 * 18 + 2;
    } else {
      var rightLimit = 15 * 11 + 8;
    }

    var topLimit = -8 + 32;
    var bottomLimit = 15 * 7;
    if (this.x < leftLimit) {
      this.x = leftLimit;
    }
    if (this.x > rightLimit) {
      this.x = rightLimit;
    }
    if (this.y < topLimit) {
      this.y = topLimit;
    }
    if (this.y > bottomLimit) {
      this.y = bottomLimit;
    }

    var camera_left = pixelSize * 66;
    var camera_top = pixelSize * 42;

    let map_game = this.map.nativeElement;
    map_game.style.transform = `translate3d( ${
      -this.x * pixelSize + camera_left
    }px, ${-this.y * pixelSize + camera_top}px, 0 )`;
    mainch.style.transform = `translate3d( ${this.x * pixelSize}px, ${
      this.y * pixelSize
    }px, 0 )`;

    this.checkCollision();
  }

  checkCollision() {
    let x_sensei1 = this.sensei1.nativeElement.offsetTop;
    let y_sensei1 = this.sensei1.nativeElement.offsetLeft;
    let width_sensei1 = this.sensei1.nativeElement.offsetWidth;
    let height_sensei1 = this.sensei1.nativeElement.offsetHeight;
    if (
      this.x < x_sensei1 + width_sensei1 &&
      this.x + width_sensei1 > this.x &&
      this.y < y_sensei1 + height_sensei1 &&
      this.y + height_sensei1 > y_sensei1
    ) {
      console.log('Se detecto la colision');
    } else {
      console.log('No choca');
    }
  }

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) this.cliente = JSON.parse(user);

    let hasBody = localStorage.getItem('noBody');

    this.obtenerRutina();

    this.bodySubs = this.store.select('bodyInfo').subscribe(({ body }) => {
      if (body != null) {
        if (body.id != null) {
          this.cliente = {
            ...this.cliente,
            bodyinfo: body.id,
          };
          if (this.cliente.id) {
            console.warn(this.cliente);
            this.store.dispatch(
              cargarUsuarioSuccess({ cliente: this.cliente })
            );
            if (hasBody == 'false') {
              Swal.fire({
                icon: 'success',
                title: `¡Tus calorias de mantenimiento son ${body.calorias}!`,
                text: 'Recuerda tener esto bien en cuenta a la hora de hacer tu dieta.',
                showConfirmButton: false,
                timer: 5000,
              });
              localStorage.setItem('noBody', 'true');
            }

            this.bodySubs.unsubscribe();
          }
        }
      }
    });
  }

  obtenerRutina() {
    console.log(this.cliente.id);
    this.usuarService.getRutinasByUser(this.cliente.id).subscribe(
      (res: any) => {
        console.log('AQUI RUTINA');
        console.log(res);
        this.rutina = res;
        this.nivel = this.rutina.nivel;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goUp() {
    var index = this.held_directions.indexOf(this.directions.up);
    if (index > -1) {
      this.held_directions.splice(index, 1);
    }
    if (
      this.directions.up &&
      this.held_directions.indexOf(this.directions.up) === -1
    ) {
      this.held_directions.unshift(this.directions.up);
    }

    this.movement();
  }

  goDown() {
    var index = this.held_directions.indexOf(this.directions.down);
    if (index > -1) {
      this.held_directions.splice(index, 1);
    }
    if (
      this.directions.down &&
      this.held_directions.indexOf(this.directions.down) === -1
    ) {
      this.held_directions.unshift(this.directions.down);
    }
    window.requestAnimationFrame(() => {
      this.movement();
    });
  }

  goLeft() {
    var index = this.held_directions.indexOf(this.directions.left);
    if (index > -1) {
      this.held_directions.splice(index, 1);
    }
    if (
      this.directions.left &&
      this.held_directions.indexOf(this.directions.left) === -1
    ) {
      this.held_directions.unshift(this.directions.left);
    }

    this.movement();
  }

  goRight() {
    var index = this.held_directions.indexOf(this.directions.right);
    if (index > -1) {
      this.held_directions.splice(index, 1);
    }
    if (
      this.directions.right &&
      this.held_directions.indexOf(this.directions.right) === -1
    ) {
      this.held_directions.unshift(this.directions.right);
    }
    this.movement();
  }

  goToCalendarNivel1() {
    // Necesito el nivel
    if (this.rutina.nivel == 1) {
      this.store.dispatch(cargarRutina({ id: this.rutina.id }));
    } else {
      this.store.dispatch(cargarRutina({ id: this.rutina.id - 1 }));
    }
    this.route.navigate(['/principal/calendario/']);
  }

  goToLessonNivel1() {
    // Necesito el nivel
    if (this.rutina.nivel == 1) {
      this.route.navigate(['/principal/clase/', this.rutina.nivel]);
    } else {
      this.route.navigate(['/principal/clase/', this.rutina.nivel - 1]);
    }
  }

  goToCalendarNivel2() {
    // Necesito el nivel
    this.store.dispatch(cargarRutina({ id: this.rutina.id }));
    this.route.navigate(['/principal/calendario/']);
  }

  goToLessonNivel2() {
    // Necesito el nivel
    this.route.navigate(['/principal/clase/', this.rutina.nivel]);
  }
}
