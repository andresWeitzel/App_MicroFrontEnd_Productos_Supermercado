import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductosComponent } from './agregar-productos.component';

describe('AgregarProductosComponent', () => {
  let component: AgregarProductosComponent;
  let fixture: ComponentFixture<AgregarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
