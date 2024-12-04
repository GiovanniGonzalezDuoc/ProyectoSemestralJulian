import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarHorariosPage } from './agregar-horarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importa el servicio
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importa SQLite
import { AlertController } from '@ionic/angular';  // Para simular las alertas

describe('AgregarHorariosPage', () => {
  let component: AgregarHorariosPage;
  let fixture: ComponentFixture<AgregarHorariosPage>;
  let mockService: jasmine.SpyObj<ServicebdService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    mockService = jasmine.createSpyObj('ServicebdService', ['obtenerCanchas', 'insertarHorario']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [AgregarHorariosPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: ServicebdService, useValue: mockService },
        { provide: AlertController, useValue: mockAlertController },
        {
          provide: SQLite,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
            executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('mostrar una alerta si algún campo está vacío al insertar', async () => {
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    component.id_cancha = 0;  // Campo vacío
    component.hora_inicio = '';
    component.hora_fin = '';
    component.estado = null!;

    await component.insertar();

    expect(mockAlertController.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });
});
