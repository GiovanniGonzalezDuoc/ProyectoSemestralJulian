import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarCanchasPage } from './modificar-canchas.page';

describe('ModificarCanchasPage', () => {
  let component: ModificarCanchasPage;
  let fixture: ComponentFixture<ModificarCanchasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarCanchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
