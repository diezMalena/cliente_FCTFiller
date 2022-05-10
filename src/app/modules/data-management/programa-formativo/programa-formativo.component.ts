import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { AnexoUpload } from 'src/app/models/anexo-upload';

import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpHeaders,
} from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-programa-formativo',
  templateUrl: './programa-formativo.component.html',
  styleUrls: ['./programa-formativo.component.scss'],
})
export class ProgramaFormativoComponent implements OnInit {
  ficheroCodificado: any;
  nombreArchivo: string;
  resultado : string[];
  constructor(
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) {
    this.nombreArchivo = '';
    this.resultado=new Array();
  }

  ngOnInit(): void {}

  upload(event: any, cadena : any) {
    let files = event.target.files[0];
    if (files) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.onload = function() {
        cadena= this.result;
      };

      this.uploadService.subirAnexo(cadena).subscribe({
        next: (response: any) => {
          //this.toastr.success('success','Anexo subido');
        },
        error: (error) => {
          //this.toastr.error('error','Anexo no subido');
        }
      })

  }
}

}

