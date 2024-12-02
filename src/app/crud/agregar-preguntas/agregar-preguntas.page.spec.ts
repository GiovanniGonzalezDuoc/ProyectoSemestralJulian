import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPreguntasPage } from './agregar-preguntas.page';

describe('AgregarPreguntasPage', () => {
  let component: AgregarPreguntasPage;
  let fixture: ComponentFixture<AgregarPreguntasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
