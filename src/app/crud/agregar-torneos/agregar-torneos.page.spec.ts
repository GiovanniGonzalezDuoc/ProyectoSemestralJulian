import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTorneosPage } from './agregar-torneos.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarTorneosPage', () => {
  let component: AgregarTorneosPage;
  let fixture: ComponentFixture<AgregarTorneosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarTorneosPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            insertarTorneo: jasmine.createSpy('insertarTorneo').and.returnValue(Promise.resolve()),
          },
        },
        {
          provide: SQLite,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
