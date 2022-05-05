import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestarCuestionarioComponent } from './contestar-cuestionario/contestar-cuestionario.component';
import { CreacionCuestionarioComponent } from './creacion-cuestionario/creacion-cuestionario.component';
import { EdicionCuestionarioComponent } from './edicion-cuestionario/edicion-cuestionario.component';
import { ListarCuestionariosComponent } from './listar-cuestionarios/listar-cuestionarios.component';
import { ListarRespuestasComponent } from './listar-respuestas/listar-respuestas.component';
import { VisualizarCuestionarioComponent } from './visualizar-cuestionario/visualizar-cuestionario.component';
import { VisualizarRespuestaComponent } from './visualizar-respuesta/visualizar-respuesta.component';


const routes: Routes = [
  {
    path:'contestar-cuestionario',
    component: ContestarCuestionarioComponent
  },
  {
    path:'creacion-cuestionario',
    component: CreacionCuestionarioComponent
  },
  {
    path:'edicion-cuestionario',
    component: EdicionCuestionarioComponent
  },
  {
    path:'listar-cuestionarios',
    component: ListarCuestionariosComponent
  },
  {
    path:'listar-respuestas',
    component: ListarRespuestasComponent
  },
  {
    path:'visualizar-cuestionario',
    component: VisualizarCuestionarioComponent
  },
  {
    path:'visualizar-respuesta',
    component: VisualizarRespuestaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuestionariosRoutingModule { }
