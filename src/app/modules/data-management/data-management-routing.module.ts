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
import { RolesGuard } from 'src/app/guards/roles.guard';
//import { SectionEmpresaComponent } from './components/section-empresa/section-empresa.component';

const routes: Routes = [
  {
    path: 'asig-alum-empresa',
    component: AsociarEmpAluComponent,
    canActivate: [PerfilesGuard, RolesGuard],
    data: {
      perfiles: ['profesor'],
      roles: [3],
    },
  },
  {
    path: 'registro-empresa',
    component: RegistroEmpresaComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'registro-empresa/representante',
    component: RepresentanteComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'registro-empresa/empresa',
    component: EmpresaComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'registro-empresa/ubicacion',
    component: UbicacionComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'registro-empresa/resumen',
    component: ResumenComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'seguimiento',
    component: SeguimientoComponent,
    canActivate: [PerfilesGuard, RolesGuard],
    data: {
      perfiles: ['profesor', 'alumno'],
      roles: [3],
    },
  },
  {
    path: 'gestion-empresas',
    component: GestionEmpresasComponent,
    canActivate: [PerfilesGuard],
    data: {
      perfiles: ['profesor'],
    },
  },
  {
    path: 'gestion-alumnos',
    component: GestionAlumnosComponent,
    canActivate: [PerfilesGuard, RolesGuard],
    data: {
      perfiles: ['profesor'],
      roles: [1, 2],
    },
  },
  {
    path: 'crud-anexos',
    component: CrudAnexosComponent,
  },
  {
    path: 'historial-anexos',
    component: HistorialAnexosComponent,
  },
  {
    path: 'crud-profesores',
    component: CrudProfesoresComponent,
    canActivate: [PerfilesGuard, RolesGuard],
    data: {
      perfiles: ['profesor'],
      roles: [1, 2],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataManagementRoutingModule {}
