import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesGuard } from 'src/app/guards/perfiles.guard';
import { RolesGuard } from 'src/app/guards/roles.guard';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

const routes: Routes = [
  {
    path: 'csv-upload',
    component: CsvUploadComponent,
    canActivate: [PerfilesGuard, RolesGuard],
    data: {
      perfiles: ['profesor'],
      roles: [1, 2],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataUploadRoutingModule {}
