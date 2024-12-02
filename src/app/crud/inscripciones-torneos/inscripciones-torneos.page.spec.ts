import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscripcionesTorneosPage } from './inscripciones-torneos.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('InscripcionesTorneosPage', () => {
  let component: InscripcionesTorneosPage;
  let fixture: ComponentFixture<InscripcionesTorneosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscripcionesTorneosPage],
      providers: [
        ServicebdService,
        {
          provide: SQLite, // Mock de SQLite
          useValue: {}, // Mock vacío o personalízalo si es necesario
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionesTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
