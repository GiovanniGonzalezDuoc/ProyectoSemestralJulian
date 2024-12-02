import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionesTorneosPage } from './inscripciones-torneos.page';

describe('InscripcionesTorneosPage', () => {
  let component: InscripcionesTorneosPage;
  let fixture: ComponentFixture<InscripcionesTorneosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionesTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
