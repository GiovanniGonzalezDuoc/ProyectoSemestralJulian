import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPreguntasPage } from './modificar-preguntas.page';

describe('ModificarPreguntasPage', () => {
  let component: ModificarPreguntasPage;
  let fixture: ComponentFixture<ModificarPreguntasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
