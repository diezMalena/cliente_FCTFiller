import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
// import { ModalInfoComponent } from './src/app/modules/data-upload/modal-info/modal-info.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    // ModalInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    // NgbModule,
    // NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
