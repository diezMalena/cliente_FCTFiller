
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jornada } from '../../../../models/Jornada/jornada';
import { ModalJornadaService } from '../../../../services/modal-jornada.service';
import { SeguimientoServiceService } from 'src/app/services/seguimiento-service.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent implements OnInit {

  jornada: FormGroup;
  submitted: boolean = false;
  public jornadaEdit: string = "";
  public dni_alumno: string = "14d";
  public jornadasArray: any = [];
  public fecha_invalida:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalJornadaService: ModalJornadaService,
    private modalActive: NgbActiveModal,
    private seguimientoService:SeguimientoServiceService

  ) {
    this.jornada = this.formBuilder.group({
      fecha: ['',[Validators.required]],
      actividad:['',[Validators.required]],
      observaciones:[''],
      horas: ['',[Validators.required,Validators.max(10)]]
    });

    //Para editar la jornada:
    this.modalJornadaService.jornadaTrigger.subscribe((data: string) => {
      this.jornadaEdit = data;
    })
  }

  ngOnInit(): void {
  }

  get formulario(){
    return this.jornada.controls;
  }

  /**
 * Nos permite cerrar el modal de la nueva jornada pulsando la cruz situada arriba a la derecha.
 * @author Malena
 */
  closeModel(){
    this.modalActive.dismiss();
  }

  /**
   * Añadir la jornada que ha añadido el alumno en la BBDD.
   * @author Malena
   */
  guardarJornada(){
    this.submitted = true;
    if(!this.jornada.valid) return;
    //Recojo los campos y los guardo en una nueva Jornada.
    //La id de la fct la mando vacía para establecerle su valor en el servidor buscando a qué fct está asociada ese alumno.
    var hoy = new Date();
    // console.log(hoy);
    //console.log(new Date(this.jornada.value.fecha)>hoy);

    this.fecha_invalida = new Date(this.jornada.value.fecha)>hoy;
    if(this.fecha_invalida) return;
    var fecha_jornada = this.jornada.value.fecha;
    var actividades = this.jornada.value.actividad;
    var observaciones = this.jornada.value.observaciones;
    if(observaciones == undefined){
      observaciones = "";
    }
    var tiempo_empleado = this.jornada.value.horas;

    let jornada = new Jornada(
      0,
      0,
      fecha_jornada,
      actividades,
      observaciones,
      tiempo_empleado
    );

    this.modalJornadaService.addJornada(jornada, this.dni_alumno).subscribe({
      next: (response) => {
        console.log('se ha insertado');
        this.recogerJornadas();
        this.closeModel();
      },
      error: e => {
        console.log('error');
      }
    });
  }


  /**
   * Método que recoge las jornadas correspondientes al alumno y las muestra por pantalla.
   * @author Malena.
   */
  public recogerJornadas(){
    this.seguimientoService.devolverJornadas(this.dni_alumno).subscribe({
      next: (response: any) => {
        this.jornadasArray = response;
        this.modalJornadaService.getJornadasInArray(this.jornadasArray);
      },
      error: e => {
        console.log('error en el nombre',e);
      }
    });
  }

}
