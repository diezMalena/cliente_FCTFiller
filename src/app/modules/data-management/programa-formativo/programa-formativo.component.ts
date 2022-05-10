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
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private toastr: ToastrService,
    public http: HttpClient
  ) {
    this.nombreArchivo = '';
  }

  ngOnInit(): void {}

  /* uploadAndProgressSingle(event: any){
    const API_STORAGE_URL = environment.apiUrl;
    const url: string = API_STORAGE_URL + 'subirAnexo';
    let file :File= <File>event.target.files[0];

    let datos={documento:file, tipo_anexo:'Anexo0', dni:"20a"}

    this.http.post(url, datos, {reportProgress: true, observe: 'events'})
      .subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          console.log(this.uploadSuccess);
          this.uploadSuccess = true;
        }
    });
  }*/

  /*uploadAndProgressSingle(event: any){

    let file :File= <File>event.target.files[0];
    const API_STORAGE_URL = environment.apiUrl;
    let tipo_anexo='Anexo0';
    let dni='20a';
    let reader = new FileReader();

   /*reader.onload = (event: any ) => {
     //console.log(reader.result);
     this.cosa= event.target.result;
   };
   reader.readAsDataURL(file);*/

  /* //let datos= new AnexoUpload(cosa,tipo_anexo,dni);
       console.log(this.cosa);
       let datos={documento:this.cosa, tipo_anexo:'Anexo0', dni:"20a"}


     }*/

  upload(event: any,hp: HttpClient,nA : any,fC : any) {
    var files = event.target.files;
    var file = files[0];
    nA = file.name;
    if (files && file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        const API_STORAGE_URL = environment.apiUrl;
        let tipo_anexo = 'Anexo0';
        let dni = '20a';
        var binaryString = event.target.result;
        //this.ficheroCodificado= btoa(binaryString);
        let datos = new AnexoUpload(
          binaryString,
          tipo_anexo,
          nA,
          dni
        );
        const url: string = API_STORAGE_URL + 'subirAnexo';
        hp.post(url, datos).subscribe((event) => {
          console.log(fC);
        });
      };

      reader.readAsBinaryString(file);
    }
  }

}
