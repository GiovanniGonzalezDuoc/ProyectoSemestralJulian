import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TorneosPage } from './torneos.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa el servicio

// Si necesitas mockear SQLite o cualquier otro servicio:
class MockSQLite {
  // Mock de los métodos que uses en el componente
  executeSql(query: string, params: any[]): Promise<any> {
    return Promise.resolve({ rows: { item: () => ({}) } }); // Mock de executeSql
  }
}

describe('TorneosPage', () => {
  let component: TorneosPage;
  let fixture: ComponentFixture<TorneosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TorneosPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: SQLite, useClass: MockSQLite }, // Mockeamos SQLite
        ServicebdService // Proveemos el servicio ServicebdService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});
