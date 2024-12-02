import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPreguntasPage } from './agregar-preguntas.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarPreguntasPage', () => {
  let component: AgregarPreguntasPage;
  let fixture: ComponentFixture<AgregarPreguntasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPreguntasPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            insertarPregunta: jasmine.createSpy('insertarPregunta').and.returnValue(Promise.resolve()),
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
    fixture = TestBed.createComponent(AgregarPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
