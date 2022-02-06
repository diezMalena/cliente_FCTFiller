import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociarEmpAluComponent } from './asociar-emp-alu/asociar-emp-alu.component';
import { CrudAnexosComponent } from './crud-anexos/crud-anexos.component';
import { EmpresaComponent } from './registro-empresa/empresa/empresa.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { RepresentanteComponent } from './registro-empresa/representante/representante.component';
import { ResumenComponent } from './registro-empresa/resumen/resumen.component';
import { UbicacionComponent } from './registro-empresa/ubicacion/ubicacion.component';
//import { SectionEmpresaComponent } from './components/section-empresa/section-empresa.component';


const routes: Routes = [
  {
    path:'asig-alum-empresa',
    component: AsociarEmpAluComponent
  },
  {
    path:'registro-empresa',
    component: RegistroEmpresaComponent
  },
  {
    path: 'registro-empresa/representante',
    component: RepresentanteComponent
  },
  {
    path: 'registro-empresa/empresa',
    component: EmpresaComponent
  },
  {
    path:'registro-empresa/ubicacion',
    component: UbicacionComponent
  },
  {
    path:'registro-empresa/resumen',
    component: ResumenComponent
  },
  {
    path:'crud-anexos',
    component: CrudAnexosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule { }
