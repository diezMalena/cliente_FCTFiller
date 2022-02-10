import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from  '@angular/cdk/drag-drop';
// import { ModalInfoComponent } from './src/app/modules/data-upload/modal-info/modal-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
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
    // NgxDropzoneModule
  ],
  exports: [
    NgbModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
