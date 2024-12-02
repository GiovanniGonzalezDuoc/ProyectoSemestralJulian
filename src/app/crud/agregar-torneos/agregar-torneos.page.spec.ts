import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTorneosPage } from './agregar-torneos.page';

describe('AgregarTorneosPage', () => {
  let component: AgregarTorneosPage;
  let fixture: ComponentFixture<AgregarTorneosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
