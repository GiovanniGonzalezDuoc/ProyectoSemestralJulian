import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRolesPage } from './agregar-roles.page';

describe('AgregarRolesPage', () => {
  let component: AgregarRolesPage;
  let fixture: ComponentFixture<AgregarRolesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
