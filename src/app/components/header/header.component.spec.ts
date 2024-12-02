import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';
import { ComponentsModule } from '../components.module';
import { ServicebdService } from 'src/app/services/servicebd.service';  // Importa ServicebdService
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  // Importa SQLite

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],  // Declaramos el HeaderComponent
      imports: [IonicModule.forRoot(), ComponentsModule],  // Importamos IonicModule y el módulo de componentes
      providers: [
        {
          provide: ServicebdService,  // Mock de ServicebdService
          useValue: {
            fetchCanchas: jasmine.createSpy('fetchCanchas').and.returnValue([]),
          },
        },
        {
          provide: SQLite,  // Mock de SQLite
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),  // Simulamos la creación de la base de datos
            executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())  // Simulamos ejecutar SQL
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
