import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCanchasPage } from './agregar-canchas.page';

describe('AgregarCanchasPage', () => {
  let component: AgregarCanchasPage;
  let fixture: ComponentFixture<AgregarCanchasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCanchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
