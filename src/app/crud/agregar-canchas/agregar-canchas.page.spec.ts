import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCanchasPage } from './agregar-canchas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';  // Asumiendo que usas un servicio como este

describe('AgregarCanchasPage', () => {
  let component: AgregarCanchasPage;
  let fixture: ComponentFixture<AgregarCanchasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCanchasPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            // Agrega los métodos que usa AgregarCanchasPage
            agregarCancha: jasmine.createSpy('agregarCancha').and.returnValue(Promise.resolve('Cancha agregada')),
            // Puedes agregar más métodos si el componente depende de ellos
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCanchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
