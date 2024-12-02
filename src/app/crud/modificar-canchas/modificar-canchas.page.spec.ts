import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { ModificarCanchasPage } from './modificar-canchas.page'; 
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';


describe('ModificarCanchasPage', () => { 
  let component: ModificarCanchasPage; 
  let fixture: ComponentFixture<ModificarCanchasPage>;

  beforeEach(() => { 
    TestBed.configureTestingModule({ 
      declarations: [ModificarCanchasPage], 
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        SQLite,
        ServicebdService
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCanchasPage);
    component = fixture.componentInstance;

    // Asegúrate de que el objeto `cancha` esté inicializado correctamente en el test
    component.cancha = { nombre_cancha: 'Cancha de Fútbol' }; // Inicializa el objeto con un valor predeterminado

    fixture.detectChanges(); // Detecta los cambios para que Angular renderice la vista
  });

  it('should create', () => { 
    expect(component).toBeTruthy(); 
  });
});
