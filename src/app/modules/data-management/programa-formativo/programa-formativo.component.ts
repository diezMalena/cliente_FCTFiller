import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpHeaders
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
  styleUrls: ['./programa-formativo.component.scss']

})
export class ProgramaFormativoComponent implements OnInit {

  file: any = [];
  thumbFileName: any = [];
  thumbUrl: any = [];
  percentDone: number;
  uploadSuccess: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private toastr: ToastrService,
    private http: HttpClient,
  ) {
    this.percentDone=0;
    this.uploadSuccess= false;
  }


  ngOnInit(): void {
  }

  uploadAndProgressSingle(event: any){
    const API_STORAGE_URL = environment.apiUrl;
    const url: string = API_STORAGE_URL + 'subirAnexo';
    let file :File= <File>event.target.files[0];
    console.log(file);
    let datos={documento:file, tipo_anexo:'Anexo0', dni:"20a"}
    console.log(datos);
    this.http.post(url, datos, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        console.log(datos);
        if (event.type === HttpEventType.UploadProgress) {
          console.log('dfdsf');
          this.percentDone = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          console.log(this.uploadSuccess);
          this.uploadSuccess = true;
        }
    });
  }
}
