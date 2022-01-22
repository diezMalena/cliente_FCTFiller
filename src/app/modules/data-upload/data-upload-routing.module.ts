import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

const routes: Routes = [
  {
    path: 'csv-upload',
    component: CsvUploadComponent,
    // pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataUploadRoutingModule {}
