import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'data-upload',
    loadChildren:() => import('./modules/data-upload/data-upload.module').then((m) => m.DataUploadModule),
  },
  {
    path:'',
    loadChildren:() => import('./core/core.module').then((m) => m.CoreModule),
  },

  // {
  //   path:'**',
  //   redirectTo:'',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
