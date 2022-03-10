import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tutor } from 'src/app/models/tutor';
import { SeguimientoServiceService } from 'src/app/services/seguimiento-service.service';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-cambiotutor',
  templateUrl: './modal-cambiotutor.component.html',
  styleUrls: ['./modal-cambiotutor.component.scss']
})
export class ModalCambiotutorComponent implements OnInit {

  usuario;
  public static readonly id_empresa: string = "id_empresa";
  public arrayTutores: Tutor[] = [];
  public dni_alumno?: string;
  public dni_tutor?: string;
  nuevo_tutor: FormGroup;

  constructor(
    private modalActive: NgbActiveModal,
    private seguimientoService:SeguimientoServiceService,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
    private formBuilder: FormBuilder,

  ) {
    this.usuario = storageUser.getUser();
    this.dni_alumno = this.usuario?.dni;

    this.nuevo_tutor = this.formBuilder.group({
      nuevoTu:[0]
    });
  }

  ngOnInit(): void {
    this.recogerTotalTutoresRespon();
  }

  /**
   * Método para cerrar el modal.
   * @author Malena
   */
  closeModel(){
    this.modalActive.dismiss();
  }

  /**
   * Método que recoge de la BBDD los tutores que pertenecen a la empresa a la que
   * está asignado el alumno.
   * @author Malena
   */
  public recogerTotalTutoresRespon(){
    let id_empresa = sessionStorage.getItem(ModalCambiotutorComponent.id_empresa)!;
    this.seguimientoService.getTutoresResponsables(id_empresa).subscribe({
      next: (response) => {
        this.arrayTutores = response;
        console.log(this.arrayTutores);
      },
      error: e => {
        this.toastr.error('No se han recogido los tutores.','Error recogida tutores');
      }
    });
  }


  /**
   * Método que actualiza en la BBDD y en la interfaz del Anexo III el dni del tutor
   * al que está asociado el alumno.
   * @author Malena
   */
  public actualizarTutor(){
    this.dni_tutor = this.nuevo_tutor.value.nuevoTu;
    this.seguimientoService.guardarTutorSeleccionado(this.dni_tutor!,this.dni_alumno!).subscribe({
      next: (response) => {
        this.toastr.success('Tutor actualizado correctamente.','Actualización de tutor');
        //No sé si esto es un poco ñapa, pero es que tengo que terminar muchas cosas :(
        setTimeout(function(){
          window.location.reload();
        }, 1000);
        this.closeModel();
      },
      error: e => {
        console.log(e);
        this.toastr.error('Error al actualizar el tutor de la empresa.','Error al actualizar tutor');
      }
    });
  }
}

