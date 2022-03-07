import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalJornadaService } from '../../../../services/modal-jornada.service';
import { Jornada } from 'src/app/models/Jornada/jornada';
import { SeguimientoServiceService } from 'src/app/services/seguimiento-service.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  usuario;
  editarJornada: FormGroup;
  submitted: boolean = false;
  public jornada?: Jornada;
  public dni_alumno?: string;
  public arrayJornadas: any = [];
  public fecha_invalida:boolean = false;


  constructor(
    private modalActive: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalJornadaService: ModalJornadaService,
    private seguimientoService:SeguimientoServiceService,
    private storageUser: LoginStorageUserService,

  ) {

    this.usuario = storageUser.getUser();
    this.dni_alumno = this.usuario?.dni;

    this.editarJornada = this.formBuilder.group({
      fecha: ['',[Validators.required]],
      actividad:['',[Validators.required]],
      observaciones:[''],
      horas: ['',[Validators.required, Validators.max(10)]]
    });

    this.modalJornadaService.jornadaTrigger.subscribe((data: Jornada) => {
      //console.log(data);
      this.jornada = data;
      console.log(this.jornada);
    });
  }

  ngOnInit(): void {
  }

  get formulario(){
    return this.editarJornada.controls;
  }


  /**
 * Nos permite cerrar el modal de la nueva jornada pulsando la cruz situada arriba a la derecha.
 * @author Malena
 */
  closeModel(){
    this.modalActive.dismiss();
  }

  /**
   * Metodo que recoge los campos de la jornada que quiere editar el alumno, los cambia
   * y los envia al servidor para poder actualizarlos en la BBDD.
   * @author Malena.
   */
  public editJornada(){
    this.submitted = true;
    if(!this.editarJornada.valid) return;

    if(this.jornada != undefined){
      var id_jornada = this.jornada.id_jornada;
      var orden_jornada = this.jornada.orden_jornada;
      var hoy = new Date();
      this.fecha_invalida = new Date(this.jornada.fecha_jornada)>hoy;
      if(this.fecha_invalida) return;
      var fecha_jornada = this.jornada.fecha_jornada;
      var actividades = this.jornada.actividades;
      var observaciones = this.jornada.observaciones;
      var tiempo_empleado = this.jornada.tiempo_empleado;

      var jornadaUpdate = new Jornada(
        id_jornada,
        orden_jornada,
        fecha_jornada,
        actividades,
        observaciones,
        tiempo_empleado
      );
      //console.log(jornadaUpdate);
      this.modalJornadaService.updateJornada(jornadaUpdate,this.dni_alumno!).subscribe({
        next: (response) => {
          //console.log(response);
          console.log('La jornada se ha actualizado correctamente.');
          this.recogerJornadas();
          this.closeModel();
        },
        error: e => {
          console.log('error en la actualizacion de la jornada',e);
        }
      });
    }
  }

  /**
   * Método que recoge las jornadas correspondientes al alumno y las muestra por pantalla.
   * @author Malena.
   */
    public recogerJornadas(){
      this.seguimientoService.devolverJornadas(this.dni_alumno!).subscribe({
        next: (response: any) => {
          this.arrayJornadas = response;
          this.modalJornadaService.getJornadasInArray(this.arrayJornadas);
        },
        error: e => {
          console.log('error en el nombre',e);
        }
      });
    }
}
