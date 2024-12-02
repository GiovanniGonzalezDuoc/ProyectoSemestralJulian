import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarTorneosPage } from './modificar-torneos.page';

describe('ModificarTorneosPage', () => {
  let component: ModificarTorneosPage;
  let fixture: ComponentFixture<ModificarTorneosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
