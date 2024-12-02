import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarRolesPage } from './agregar-roles.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarRolesPage', () => {
  let component: AgregarRolesPage;
  let fixture: ComponentFixture<AgregarRolesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarRolesPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        {
          provide: ServicebdService,
          useValue: {
            insertarRol: jasmine.createSpy('insertarRol').and.returnValue(Promise.resolve()),
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
    fixture = TestBed.createComponent(AgregarRolesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
