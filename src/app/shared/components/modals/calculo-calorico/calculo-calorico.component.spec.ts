import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoCaloricoComponent } from './calculo-calorico.component';

describe('CalculoCaloricoComponent', () => {
  let component: CalculoCaloricoComponent;
  let fixture: ComponentFixture<CalculoCaloricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoCaloricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoCaloricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
