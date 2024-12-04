import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarRolesPage } from './agregar-roles.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';  // Para simular las alertas

describe('AgregarRolesPage', () => {
  let component: AgregarRolesPage;
  let fixture: ComponentFixture<AgregarRolesPage>;
  let mockService: jasmine.SpyObj<ServicebdService>;
  let mockAlertController: jasmine.SpyObj<AlertController>;

  beforeEach(waitForAsync(() => {
    mockService = jasmine.createSpyObj('ServicebdService', ['insertarRol']);
    mockAlertController = jasmine.createSpyObj('AlertController', ['create']);

    TestBed.configureTestingModule({
      declarations: [AgregarRolesPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: ServicebdService, useValue: mockService },
        { provide: AlertController, useValue: mockAlertController },
        {
          provide: SQLite,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Mostrar una alerta si el nombre del rol está vacío', async () => {
    const alertSpy = jasmine.createSpyObj('Alert', ['present']);
    mockAlertController.create.and.returnValue(Promise.resolve(alertSpy));

    component.nombre_rol = '';  // Campo vacío

    await component.insertar();

    expect(mockAlertController.create).toHaveBeenCalled();
    expect(alertSpy.present).toHaveBeenCalled();
  });
});
