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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataManagementRoutingModule,
    NgbModule,
    DragDropModule,
    SignaturePadModule,
  ]
})
export class DataManagementModule { }
