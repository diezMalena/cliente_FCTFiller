import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStorageUserService } from './services/login.storageUser.service';

const storage = new LoginStorageUserService();
const routes: Routes = [
  {
    path: 'data-upload',
    loadChildren: () =>
      import('./modules/data-upload/data-upload.module').then(
        (m) => m.DataUploadModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      storage.isLogged()
        ? import('./core/core.module').then((m) => m.CoreModule)
        : import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'data-management',
    loadChildren: () =>
      import('./modules/data-management/data-management.module').then(
        (m) => m.DataManagementModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
