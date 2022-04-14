import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnexoService } from 'src/app/services/crud-anexos.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ModalFirmaComponent } from '../modal-firma/modal-firma.component';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-tipo-anexo',
  templateUrl: './modal-tipo-anexo.component.html',
  styleUrls: ['./modal-tipo-anexo.component.scss']
})
export class ModalTipoAnexoComponent implements OnInit {

   /***********************************************************************/
  //#region Inicialización de variables y formulario

  tipoAnexo: any = [];
  codAnexo: any = [];

  usuario;
  dni?: string;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalActive: NgbActiveModal,
    private anexoService: AnexoService,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
    private modal: NgbModal
  ) {
    this.tipoAnexo = sessionStorage.getItem('tipoAnexo');
    this.codAnexo= sessionStorage.getItem('codigo');

    this.usuario = storageUser.getUser();
    this.dni = this.usuario?.dni;

  }

  ngOnInit(): void {

  }

  //#endregion
  /***********************************************************************/



    /***********************************************************************/
  //#region Gestión del formulario

  /*get formulario() {
    return this.AnexoXV.controls;
  }*/

  public onSubmit() {
    this.submitted = true;
    if(this.tipoAnexo=='AnexoXV'){
      this.anexoService.rellenarAnexoXV(this.dni!,this.codAnexo).subscribe({
        next: (response: any) => {
          this.toastr.success('El AnexoXV se ha generado!', 'Hecho!');
          //this.profesoresArray = response;
          //this.profesorService.getProfesoresInArray(this.profesoresArray);
        },
        error: (e) => {
          this.toastr.error('El AnexoXV no ha podido generarse', 'Fallo');
        },
      });
    }
  }
    //#endregion
  /***********************************************************************/


  /***********************************************************************/
  //#region Funciones auxiliares y otros

  /**
   * Esta funcion te permite cerrar un modal con la cruz situada arriba a la derecha
   * @author Laura <lauramorenoramos@gmail.com>
   */
   CloseModal() {
    this.modalActive.dismiss();
  }

    /**
   * Abre un modal para la firma del anexo
   * @author Pablo
   */
     public abrirModalFirma() {
      const modalFirma = this.modal.open(ModalFirmaComponent, {
        size: 'md',
        backdrop: 'static',
        keyboard: false,
      });
      //modalFirma.componentInstance.codigo_anexo = codigo_anexo;
    }
  //#endregion
  /***********************************************************************/
}


