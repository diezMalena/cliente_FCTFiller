import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalJornadaService } from '../../../../services/modal-jornada.service';
import { Jornada } from 'src/app/models/Jornada/jornada';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  editarJornada: FormGroup;
  submitted: boolean = false;
  public jornada?: Jornada;

  constructor(
    private modalActive: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalJornadaService: ModalJornadaService,

  ) {
    this.editarJornada = this.formBuilder.group({
      fecha: ['',[Validators.required]],
      actividad:['',[Validators.required]],
      observaciones:[''],
      horas: ['',[Validators.required]]
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

  public editJornada(){
    this.submitted = true;
    if(!this.editarJornada.valid) return;

    if(this.jornada != undefined){
      var id_jornada = this.jornada.id_jornada;
      var orden_jornada = this.jornada.orden_jornada;
      var fecha_jornada = this.jornada.fecha_jornada;
      var actividades = this.jornada.actividades;
      var observaciones = this.jornada.observaciones;
      var tiempo_empleado = this.jornada.tiempo_empleado;
      var dni_alumno = '12345678Q';


      var jornadaUpdate = new Jornada(
        id_jornada,
        orden_jornada,
        fecha_jornada,
        actividades,
        observaciones,
        tiempo_empleado
      );
      //console.log(jornadaUpdate);
      this.modalJornadaService.updateJornada(jornadaUpdate,dni_alumno).subscribe({
        next: (response) => {
          //console.log(response);
          console.log('La jornada se ha actualizado correctamente.');
          this.closeModel();
        },
        error: e => {
          console.log('error en la actualizacion de la jornada',e);
        }
      });
    }
  }
}
