import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionBodyTypeComponent } from './selection-body-type.component';

describe('SelectionBodyTypeComponent', () => {
  let component: SelectionBodyTypeComponent;
  let fixture: ComponentFixture<SelectionBodyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionBodyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionBodyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
