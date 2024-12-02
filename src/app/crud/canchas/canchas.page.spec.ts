import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanchasPage } from './canchas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs'; // Importa 'of' para simular un Observable

describe('CanchasPage', () => {
  let component: CanchasPage;
  let fixture: ComponentFixture<CanchasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CanchasPage],
      imports: [IonicModule.forRoot(), FormsModule], // Importa los módulos necesarios
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            fetchCanchas: jasmine.createSpy('fetchCanchas').and.returnValue([]), // Simula fetchCanchas
            dbState: jasmine.createSpy('dbState').and.returnValue(of('connected')), // Cambia a un Observable
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
    fixture = TestBed.createComponent(CanchasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
