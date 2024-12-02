import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarHorariosPage } from './modificar-horarios.page';

describe('ModificarHorariosPage', () => {
  let component: ModificarHorariosPage;
  let fixture: ComponentFixture<ModificarHorariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
