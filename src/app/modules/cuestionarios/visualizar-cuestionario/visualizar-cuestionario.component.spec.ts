import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCuestionarioComponent } from './visualizar-cuestionario.component';

describe('VisualizarCuestionarioComponent', () => {
  let component: VisualizarCuestionarioComponent;
  let fixture: ComponentFixture<VisualizarCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarCuestionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
