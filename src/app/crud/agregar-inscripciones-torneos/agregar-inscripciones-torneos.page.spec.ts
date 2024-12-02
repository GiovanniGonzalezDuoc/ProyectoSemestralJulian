import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarInscripcionesTorneosPage } from './agregar-inscripciones-torneos.page';

describe('AgregarInscripcionesTorneosPage', () => {
  let component: AgregarInscripcionesTorneosPage;
  let fixture: ComponentFixture<AgregarInscripcionesTorneosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInscripcionesTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
