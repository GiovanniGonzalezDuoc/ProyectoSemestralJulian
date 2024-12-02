import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarInscripcionesTorneosPage } from './agregar-inscripciones-torneos.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importando el servicio
import { of } from 'rxjs';

describe('AgregarInscripcionesTorneosPage', () => {
  let component: AgregarInscripcionesTorneosPage;
  let fixture: ComponentFixture<AgregarInscripcionesTorneosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarInscripcionesTorneosPage],
      imports: [IonicModule.forRoot(), FormsModule],  // Se importan los módulos necesarios
      providers: [
        {
          provide: ServicebdService,  // Mock del servicio
          useValue: {
            obtenerTorneos: jasmine.createSpy('obtenerTorneos').and.returnValue(Promise.resolve([])),
            agregarInscripcion: jasmine.createSpy('agregarInscripcion').and.returnValue(Promise.resolve()),
          },
        },
        {
          provide: ActivatedRoute,  // Mock de ActivatedRoute
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('1'),  // Simulando parámetro de ruta
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInscripcionesTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
