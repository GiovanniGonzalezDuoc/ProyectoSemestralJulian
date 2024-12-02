import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuariosPage } from './agregar-usuarios.page';

describe('AgregarUsuariosPage', () => {
  let component: AgregarUsuariosPage;
  let fixture: ComponentFixture<AgregarUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
