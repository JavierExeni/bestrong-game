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

  constructor(private render2: Renderer2) {}

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
    var rightLimit = 15 * 11 + 8;
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

  ngOnInit(): void {}

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
}
