import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationBodyTypeComponent } from './presentation-body-type.component';

describe('PresentationBodyTypeComponent', () => {
  let component: PresentationBodyTypeComponent;
  let fixture: ComponentFixture<PresentationBodyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationBodyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationBodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
