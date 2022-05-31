import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { AnexoUpload } from 'src/app/models/anexo-upload';
import { AnexoService } from 'src/app/services/crud-anexos.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ManualCrudAnexosComponent } from '../../manuales/manual-crud-anexos/manual-crud-anexos.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ManualAnexo2y4Component } from '../../manuales/manual-anexo2y4/manual-anexo2y4.component';

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
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private anexoService: AnexoService,
    private storageUser: LoginStorageUserService
  ) {
    this.usuario = storageUser.getUser();
    this.dni_usuario = this.usuario?.dni;
    this.tipoAnexo = 'Anexo2';
  }

  ngOnInit(): void {
  }

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
    console.log(this.tipoAnexo);
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
    if(this.evento.name=='Anexo2.docx' || this.evento.name=='Anexo2.pdf'|| this.evento.name=='Anexo4.docx'|| this.evento.name=='Anexo4.pdf'){
      if(this.evento.name=='Anexo2.docx' || this.evento.name=='Anexo2.pdf'){
        this.tipoAnexo='Anexo2'
      }else{
        this.tipoAnexo='Anexo4'
      }
    let datos = new AnexoUpload(
      sessionStorage.getItem('cosa')!,
      this.tipoAnexo,
      this.evento.name,
      this.dni_usuario!
    );

    this.uploadService.subirAnexo(datos).subscribe({
      next: (res) => {
        this.toastr.success(this.tipoAnexo+' Subido', 'Hecho!');
        this.rellenarAnexo();
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('El anexo '+this.tipoAnexo+' no ha podido subirse', 'Fallo');
      },
    });
  }else{
    this.toastr.error('El anexo debe llamarse Anexo2.docx o .pdf o Anexo4.docx o .pdf', 'Fallo');
  }
  }

  /**
   * Esta funcion llama a la funcion rellenarAnexoIIyIV del servicio AnexoService para
   * que se rellene el AnexoII o IV según lo que seleccione el usuario en el desplegable
   * @author Laura <lauramorenoramos97@gmail.com>
   */
   public rellenarAnexo() {
    this.anexoService.rellenarAnexoIIyIV(this.evento.name,this.dni_usuario!).subscribe({
      next: (res) => {
        const current = new Date();
        const blob = new Blob([res], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, 'backup_' + current.getTime() + '.zip');
        this.toastr.success(this.tipoAnexo+' Descargado', 'Hecho!');
      },
      error: (e) => {
        console.log(e);
        this.toastr.error('El '+this.tipoAnexo+' no ha podido descargarse', 'Fallo');
      },
    });
  }

  /**
   * Esta funcion abre el manual de ayuda del crud de anexos
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public abrirAyuda() {
    this.modal.open(ManualAnexo2y4Component, { size: 'lg' });
  }
}
