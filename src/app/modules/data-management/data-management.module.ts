import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { AsociarEmpAluComponent } from './asociar-emp-alu/asociar-emp-alu.component';
import { FirmaDocComponent } from './firma-doc/firma-doc.component';



@NgModule({
  declarations: [
    RegistroEmpresaComponent,
    AsociarEmpAluComponent,
    FirmaDocComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DataManagementModule { }
