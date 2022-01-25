import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

const routes: Routes = [
  {
    path: 'csv-upload',
    component: CsvUploadComponent,
  },
  // {
  //   path: 'modal-info',
  //   component: ModalInfoComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataUploadRoutingModule {}
