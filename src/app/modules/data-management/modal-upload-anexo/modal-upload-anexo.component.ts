import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnexoUpload } from 'src/app/models/anexo-upload';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-upload-anexo',
  templateUrl: './modal-upload-anexo.component.html',
  styleUrls: ['./modal-upload-anexo.component.scss']
})
export class ModalUploadAnexoComponent implements OnInit {

  usuario;
  dni_usuario;
  public evento: any = null;
  tipoAnexo: any;

  constructor(
    private toastr: ToastrService,
    private modalActive: NgbActiveModal,
    private uploadService: FileUploadService,
    private storageUser: LoginStorageUserService,
    private modal: NgbModal
  )
  {
    this.usuario = storageUser.getUser();
    this.dni_usuario = this.usuario?.dni;
    this.tipoAnexo = sessionStorage.getItem('tipoAnexo');;
  }

  ngOnInit(): void {
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
    * Si la llamada es desde el crud de anexos cogeremos el nombre original del archivo
    */
    public enviarAnexo() {
      let llamadaDesdeCrud= sessionStorage.getItem('llamadaDesdeCrud');
      let nombreArchivo :any;
      let nombreSinExtension: any;
      let extension : any;

      //Si la llamada viene desde el crud de anexos
      if(llamadaDesdeCrud == '1'){
        nombreArchivo = sessionStorage.getItem('codigoAnexo');
        sessionStorage.setItem('llamadaDesdeCrud','0');
      }else{
        //Si la llamada no es desde el crud de anexo, si es el Anexo1
        if(this.tipoAnexo=='Anexo1'){
          extension=this.evento.name.split('.');
          extension='.'+extension[extension.length - 1];
          nombreSinExtension=sessionStorage.getItem('codigoAnexo')!.split('.');
          nombreSinExtension=nombreSinExtension[0];
          nombreArchivo=nombreSinExtension+extension;
          console.log(nombreArchivo);
        }else{
          nombreArchivo =this.evento.name;
        }
      }

      let datos = new AnexoUpload(
        sessionStorage.getItem('cosa')!,
        this.tipoAnexo,
        nombreArchivo,
        this.dni_usuario!
      );

      this.uploadService.subirAnexo(datos).subscribe({
        next: (res) => {
          this.toastr.success('Anexo Subido', 'Hecho!');
        },
        error: (e) => {
          console.log(e);
          this.toastr.error('El anexo no ha podido subirse', 'Fallo');
        },
      });
    }

      /**
   * Esta funcion te permite cerrar un modal con la cruz situada arriba a la derecha
   * @author Laura <lauramorenoramos@gmail.com>
   */
   CloseModal() {
    this.modalActive.dismiss();
  }
}
