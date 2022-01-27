import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren:() => import('./core/core.module').then((m) => m.CoreModule),
  },

  {
    path: 'data-management',
    loadChildren:() => import('./modules/data-management/data-management.module').then((m) => m.DataManagementModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
