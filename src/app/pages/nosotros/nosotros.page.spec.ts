import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NosotrosPage } from './nosotros.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa HttpClientTestingModule
import { ApiService } from 'src/app/services/api.service';  // Si el servicio es ApiService, importalo aquí
import { IonicModule } from '@ionic/angular';  // Si es necesario para el componente

describe('NosotrosPage', () => {
  let component: NosotrosPage;
  let fixture: ComponentFixture<NosotrosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NosotrosPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule  // Agrega HttpClientTestingModule para usar HttpClient en el test
      ],
      providers: [ApiService]  // Proveemos ApiService si es necesario
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar los cambios para que Angular renderice la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });
});
