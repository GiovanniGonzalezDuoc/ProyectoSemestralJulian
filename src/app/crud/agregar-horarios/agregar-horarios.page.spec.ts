import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarHorariosPage } from './agregar-horarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa el servicio
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importa SQLite

describe('AgregarHorariosPage', () => {
  let component: AgregarHorariosPage;
  let fixture: ComponentFixture<AgregarHorariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarHorariosPage], // Declara el componente
      imports: [IonicModule.forRoot(), FormsModule], // Asegúrate de que estos módulos estén importados
      providers: [
        {
          provide: ServicebdService,  // Mock de ServicebdService
          useValue: {
            fetchHorarios: jasmine.createSpy('fetchHorarios').and.returnValue([]), // Simula la función fetchHorarios
          },
        },
        {
          provide: SQLite,  // Mock de SQLite
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),  // Simula la creación de la base de datos
            executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),  // Simula la ejecución de SQL
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarHorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
