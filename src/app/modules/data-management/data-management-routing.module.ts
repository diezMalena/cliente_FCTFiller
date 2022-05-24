import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociarEmpAluComponent } from './asociar-emp-alu/asociar-emp-alu.component';
import { GestionEmpresasComponent } from './gestion-empresas/gestion-empresas.component';
import { CrudAnexosComponent } from './crud-anexos/crud-anexos.component';
import { EmpresaComponent } from './registro-empresa/empresa/empresa.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { RepresentanteComponent } from './registro-empresa/representante/representante.component';
import { ResumenComponent } from './registro-empresa/resumen/resumen.component';
import { UbicacionComponent } from './registro-empresa/ubicacion/ubicacion.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { CrudProfesoresComponent } from './crud-profesores/crud-profesores.component';
import { GestionAlumnosComponent } from './gestion-alumnos/gestion-alumnos.component';
import { HistorialAnexosComponent } from './historial-anexos/historial-anexos.component';
import { PerfilesGuard } from 'src/app/guards/perfiles.guard';
import { ProfesoresGuard } from 'src/app/guards/profesores.guard';
import { AlumnosGuard } from 'src/app/guards/alumnos.guard';
import { SeguimientoGuard } from 'src/app/guards/seguimiento.guard';
import { SeguimientoTutoresComponent } from './seguimiento-tutores/seguimiento-tutores.component';

const routes: Routes = [
  {
    path: 'asig-alum-empresa',
    component: AsociarEmpAluComponent,
    canActivate: [ProfesoresGuard],
    data: {
      roles: [3],
    },
  },
  {
    path: 'registro-empresa',
    component: RegistroEmpresaComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'registro-empresa/representante',
    component: RepresentanteComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'registro-empresa/empresa',
    component: EmpresaComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'registro-empresa/ubicacion',
    component: UbicacionComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'registro-empresa/resumen',
    component: ResumenComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'seguimiento',
    component: SeguimientoComponent,
    canActivate: [AlumnosGuard],
  },
  {
    path: 'seguimiento_tutores',
    component: SeguimientoTutoresComponent,
    canActivate: [SeguimientoGuard],
  },
  {
    path: 'gestion-empresas',
    component: GestionEmpresasComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'gestion-alumnos',
    component: GestionAlumnosComponent,
    canActivate: [ProfesoresGuard],
    data: {
      roles: [1, 2],
    },
  },
  {
    path: 'crud-anexos',
    component: CrudAnexosComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'historial-anexos',
    component: HistorialAnexosComponent,
    canActivate: [ProfesoresGuard],
  },
  {
    path: 'crud-profesores',
    component: CrudProfesoresComponent,
    canActivate: [ProfesoresGuard],
    data: {
      roles: [1, 2],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManagementRoutingModule {}
