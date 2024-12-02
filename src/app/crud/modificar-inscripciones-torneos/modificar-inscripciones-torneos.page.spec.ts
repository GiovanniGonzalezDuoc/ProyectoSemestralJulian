import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarInscripcionesTorneosPage } from './modificar-inscripciones-torneos.page';

describe('ModificarInscripcionesTorneosPage', () => {
  let component: ModificarInscripcionesTorneosPage;
  let fixture: ComponentFixture<ModificarInscripcionesTorneosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarInscripcionesTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
