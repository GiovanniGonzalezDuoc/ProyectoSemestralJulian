import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarHorariosPage } from './modificar-horarios.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('ModificarHorariosPage', () => {
  let component: ModificarHorariosPage;
  let fixture: ComponentFixture<ModificarHorariosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarHorariosPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [SQLite,ServicebdService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarHorariosPage);
    component = fixture.componentInstance;

    // Inicializar las propiedades necesarias del componente
    // Si `horarios` es un array o un objeto, inicialízalo aquí
    component.horario = [{ hora: '10:00 AM', cancha: 'Cancha 1' }]; // Ejemplo de inicialización

    fixture.detectChanges(); // Detectar los cambios para actualizar la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verificar que el componente se cree correctamente
  });
});
