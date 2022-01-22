import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { DataUploadRoutingModule } from './data-upload-routing.module';


@NgModule({
  declarations: [
    CsvUploadComponent
  ],
  imports: [
    SharedModule,
    // CommonModule,
    NgxDropzoneModule,
    DataUploadRoutingModule
  ]
})
export class DataUploadModule { }
