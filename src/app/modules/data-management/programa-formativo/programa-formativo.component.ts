import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { AnexoUpload } from 'src/app/models/anexo-upload';
import { AnexoService } from 'src/app/services/crud-anexos.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ManualCrudAnexosComponent } from '../../manuales/manual-crud-anexos/manual-crud-anexos.component';

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
  usuario;
  dni_usuario;
  public evento: any = null;
  tipoAnexo: any;
  constructor(
    private uploadService: FileUploadService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private anexoService: AnexoService,
    private storageUser: LoginStorageUserService
  ) {
    this.usuario = storageUser.getUser();
    this.dni_usuario = this.usuario?.dni;
    this.tipoAnexo = '';
  }

  ngOnInit(): void {}

  /**
   * Esta funcion se encarga de coger el tipo de Anexo del desplegable
   * @param event es el tipo de anexo
   * @author Laura <lauramorenoramos97@gmail.com>
   *
   */
  public cogerTipoAnexo(event: any) {
    this.tipoAnexo = event.target.value;
  }

  /**
   *
   * @param event
   */
  public upload(event: any) {
    this.evento = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.evento);
    fileReader.onload = function (e: any) {
      sessionStorage.setItem('cosa', e.target.result);
    };
  }

  /**
   *
   */
  public enviarAnexo() {
    if(this.evento.name=='plantilla.docx'){
    let datos = new AnexoUpload(
      sessionStorage.getItem('cosa')!,
      this.tipoAnexo,
      this.evento.name,
      this.dni_usuario!
    );
    console.log(this.evento.name);

    this.uploadService.subirAnexo(datos).subscribe({
      next: (res) => {
        this.toastr.success('Anexo Subido', 'Hecho!');
        this.rellenarAnexo();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('El anexo no ha podido subirse', 'Fallo');
      },
    });
  }else{
    this.toastr.error('El anexo debe llamarse plantilla.docx', 'Fallo');
  }
  }

  /**
   * Esta funcion llama a la funcion rellenarAnexoIIyIV del servicio AnexoService para
   * que se rellene el AnexoII o IV según lo que seleccione el usuario en el desplegable
   * @author Laura <lauramorenoramos97@gmail.com>
   */
   public rellenarAnexo() {
    this.anexoService.rellenarAnexoIIyIV(this.tipoAnexo,this.dni_usuario!).subscribe({
      next: (res) => {
        this.toastr.success('Anexo Descargado', 'Hecho!');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('El anexo no ha podido descargarse', 'Fallo');
      },
    });
  }

  /**
   * Esta funcion abre el manual de ayuda del crud de anexos
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public abrirAyuda() {
    this.modal.open(ManualCrudAnexosComponent, { size: 'lg' });
  }
}
