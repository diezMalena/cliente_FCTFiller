import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestarCuestionarioComponent } from './contestar-cuestionario/contestar-cuestionario.component';
import { CreacionCuestionarioComponent } from './creacion-cuestionario/creacion-cuestionario.component';
import { ListarCuestionariosComponent } from './listar-cuestionarios/listar-cuestionarios.component';
import { ListarRespuestasComponent } from './listar-respuestas/listar-respuestas.component';
import { EdicionCuestionarioComponent } from './edicion-cuestionario/edicion-cuestionario.component';
import { VisualizarRespuestaComponent } from './visualizar-respuesta/visualizar-respuesta.component';
import { VisualizarCuestionarioComponent } from './visualizar-cuestionario/visualizar-cuestionario.component';
import { CuestionariosRoutingModule } from './cuestionarios-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContestarCuestionarioComponent,
    CreacionCuestionarioComponent,
    ListarCuestionariosComponent,
    ListarRespuestasComponent,
    EdicionCuestionarioComponent,
    VisualizarRespuestaComponent,
    VisualizarCuestionarioComponent
  ],
  imports: [
    CommonModule,
    CuestionariosRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CuestionariosModule { }
