import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { AsociarEmpAluComponent } from './asociar-emp-alu/asociar-emp-alu.component';
import { FirmaDocComponent } from './firma-doc/firma-doc.component';
import { RepresentanteComponent } from './registro-empresa/representante/representante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { EmpresaComponent } from './registro-empresa/empresa/empresa.component';
import { UbicacionComponent } from './registro-empresa/ubicacion/ubicacion.component';
import { ResumenComponent } from './registro-empresa/resumen/resumen.component';



@NgModule({
  declarations: [
    RegistroEmpresaComponent,
    AsociarEmpAluComponent,
    FirmaDocComponent,
    RepresentanteComponent,
    EmpresaComponent,
    UbicacionComponent,
    ResumenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataManagementRoutingModule
  ]
})
export class DataManagementModule { }
