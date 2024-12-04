import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCanchasPage } from './agregar-canchas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('AgregarCanchasPage', () => {
  let component: AgregarCanchasPage;
  let fixture: ComponentFixture<AgregarCanchasPage>;
  let mockService: jasmine.SpyObj<ServicebdService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ServicebdService', ['insertarCancha']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [AgregarCanchasPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: ServicebdService, useValue: mockService },
        { provide: AlertController, useValue: mockAlertController },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCanchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Mostrar una alerta si algún campo está vacío al insertar', async () => {
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    component.nombre_cancha = '';  // Campo vacío
    component.tipo_deporte = 'Futbol';

    await component.insertar();

    expect(mockAlertController.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });
});
