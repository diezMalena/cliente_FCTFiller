import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { AsociarEmpAluComponent } from './asociar-emp-alu/asociar-emp-alu.component';
import { FirmaDocComponent } from './firma-doc/firma-doc.component';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { RepresentanteComponent } from './registro-empresa/representante/representante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpresaComponent } from './registro-empresa/empresa/empresa.component';
import { UbicacionComponent } from './registro-empresa/ubicacion/ubicacion.component';
import { ResumenComponent } from './registro-empresa/resumen/resumen.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { ModalEditarComponent } from './seguimiento/modal-editar/modal-editar.component';
import { ModalAddComponent } from './seguimiento/modal-add/modal-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from  '@angular/cdk/drag-drop';
import { GestionEmpresasComponent } from './gestion-empresas/gestion-empresas.component';
import { ModalEmpresaComponent } from './modal-empresa/modal-empresa.component';
import { CrudAnexosComponent } from './crud-anexos/crud-anexos.component';
import { ModalFirmaComponent } from './modal-firma/modal-firma.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CrudProfesoresComponent } from './crud-profesores/crud-profesores.component';
import { ModalProfesoresComponent } from './modal-profesores/modal-profesores.component';
import { ModalDescargaComponent } from './registro-empresa/modal-descarga/modal-descarga.component';
import { GestionAlumnosComponent } from './gestion-alumnos/gestion-alumnos.component';
import { GestionGastosAlumnoComponent } from './gestion-gastos-alumno/gestion-gastos-alumno.component';
import { ModalAlumnoComponent } from './modal-alumno/modal-alumno.component';
import { DataTablesModule } from 'angular-datatables';
import { ModalCambiotutorComponent } from './seguimiento/modal-cambiotutor/modal-cambiotutor.component';
import { HistorialAnexosComponent } from './historial-anexos/historial-anexos.component';
import { ModalGestionGastosAlumnoComponent } from './modal-gestion-gastos-alumno/modal-gestion-gastos-alumno.component';

@NgModule({
  declarations: [
    RegistroEmpresaComponent,
    AsociarEmpAluComponent,
    FirmaDocComponent,
    RepresentanteComponent,
    EmpresaComponent,
    UbicacionComponent,
    ResumenComponent,
    SeguimientoComponent,
    ModalEditarComponent,
    ModalAddComponent,
    GestionEmpresasComponent,
    ModalEmpresaComponent,
    CrudAnexosComponent,
    ModalFirmaComponent,
    CrudProfesoresComponent,
    ModalProfesoresComponent,
    ModalDescargaComponent,
    ModalCambiotutorComponent,
    GestionAlumnosComponent,
    ModalAlumnoComponent,
    GestionGastosAlumnoComponent,
    ModalGestionGastosAlumnoComponent,
    HistorialAnexosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataManagementRoutingModule,
    NgbModule,
    DragDropModule,
    SignaturePadModule,
    DataTablesModule
  ]
})
export class DataManagementModule { }
