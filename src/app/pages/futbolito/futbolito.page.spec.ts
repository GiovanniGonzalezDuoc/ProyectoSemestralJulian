import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FutbolitoPage } from './futbolito.page';

describe('FutbolitoPage', () => {
  let component: FutbolitoPage;
  let fixture: ComponentFixture<FutbolitoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FutbolitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
