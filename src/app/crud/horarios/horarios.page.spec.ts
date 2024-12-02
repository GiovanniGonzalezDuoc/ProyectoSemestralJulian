import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HorariosPage } from './horarios.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs'; // Importa 'of' para simular un Observable

describe('HorariosPage', () => {
  let component: HorariosPage;
  let fixture: ComponentFixture<HorariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HorariosPage],
      imports: [IonicModule.forRoot(), FormsModule], // Importa los módulos necesarios
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            fetchHorarios: jasmine.createSpy('fetchHorarios').and.returnValue([]),
            dbState: jasmine.createSpy('dbState').and.returnValue(of('connected')), // Simula dbState con un Observable
          },
        },
        {
          provide: SQLite,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()), // Simula SQLite
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
