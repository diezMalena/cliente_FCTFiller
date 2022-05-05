import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarRespuestaComponent } from './visualizar-respuesta.component';

describe('VisualizarRespuestaComponent', () => {
  let component: VisualizarRespuestaComponent;
  let fixture: ComponentFixture<VisualizarRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarRespuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
