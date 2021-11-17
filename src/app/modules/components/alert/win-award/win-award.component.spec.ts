import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinAwardComponent } from './win-award.component';

describe('WinAwardComponent', () => {
  let component: WinAwardComponent;
  let fixture: ComponentFixture<WinAwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinAwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
