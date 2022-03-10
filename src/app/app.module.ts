import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from  '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ManualCrudAnexosComponent } from './modules/manuales/manual-crud-anexos/manual-crud-anexos.component';
import { ManualCrudProfesoresComponent } from './modules/manuales/manual-crud-profesores/manual-crud-profesores.component';
import { ManualGestionEmpresasComponent } from './modules/manuales/manual-gestion-empresas/manual-gestion-empresas.component';
import { ManualRegistroEmpresasComponent } from './modules/manuales/manual-registro-empresas/manual-registro-empresas.component';
// import { ModalInfoComponent } from './src/app/modules/data-upload/modal-info/modal-info.component';
// import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    ManualCrudAnexosComponent,
    ManualCrudProfesoresComponent,
    ManualGestionEmpresasComponent,
    ManualRegistroEmpresasComponent,
    // ModalInfoComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxDropzoneModule
  ],
  exports: [
    NgbModule,
    MatDialogModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
