import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ProfesorCreate } from 'src/app/models/profesores/profesorCreate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-profesores',
  templateUrl: './modal-profesores.component.html',
  styleUrls: ['./modal-profesores.component.scss']
})
export class ModalProfesoresComponent implements OnInit {


  public profesor: any = [];
  public numero : any;
  public roles: any=[];
  public dniPersonaRegistrada='1A';
  submitted: boolean =false;

  datosProfesor:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalActive: NgbActiveModal,
    private profesorService: CrudProfesoresService,
    private toastr: ToastrService,
  ) {

    this.numero=  sessionStorage.getItem("numPeticion");

    this.datosProfesor= this.formBuilder.group({
      dni:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      password1:['',[Validators.required]],
      password2:['',[Validators.required]],
    });
  }

  get formulario(){
    return this.datosProfesor.controls;
  }

  ngOnInit(): void {
    if (this.numero=='0'){
      this.verProfesor();
    }else{
      if (this.numero=='2'){
        this.verProfesorEdit();
      }
    }
  }

  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion nos permite ver un profesor
   */
  public verProfesor(){
    const dni_profesor: any= sessionStorage.getItem("dniProfesor");
    this.profesorService.getProfesor(dni_profesor).subscribe((response)=>{
      this.profesor=response;
    })
  }


  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion permite ver a un profesor, al que le llegan unos parametros especificos,
   * almacena en una sesion el dni del antiguo profesor que va a ser editado, para poder
   * enviarlo al servidor y asi poder editar desde la base de datos, también llama a una funcion
   * para que, cuando verProfesor edit sea llamada, la respuesta de esta permita editar
   * los campos del formulario y asi poder ver los datos del profesor a editar.
   */
  public verProfesorEdit(){
    const dni_profesor: any= sessionStorage.getItem("dniProfesor");
    this.profesorService.getProfesorEdit(dni_profesor).subscribe((response)=>{
      this.profesor=response;
      sessionStorage.setItem('dniAnt',this.profesor[0].personaAux);
      this.updateForm();
    })
  }

  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion edita los values de los campos del formulario cuando llega la información
   * para asi poder ver al usuario y posteriormente editarlo.
   */
  public updateForm(){
    this.datosProfesor.controls['dni'].setValue(this.profesor[0].dni);
    this.datosProfesor.controls['email'].setValue(this.profesor[0].email);
    this.datosProfesor.controls['nombre'].setValue(this.profesor[0].nombre);
    this.datosProfesor.controls['apellido'].setValue(this.profesor[0].apellidos);
    this.datosProfesor.controls['password1'].setValue(this.profesor[0].password1);
    this.datosProfesor.controls['password2'].setValue(this.profesor[0].password2);
  }


  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion edita a un profesor, recorre los valores de los roles de un array de
   * inputs, los almacena en otro array que es parseado para que sean numeros, y asi
   * poder enviarse al servidor, para que pueda modificar los roles
   * @returns
   */
  public onSubmitEdit(){
    this.submitted=true;
    if(this.datosProfesor.invalid)
      return;


      this.roles = document.querySelectorAll('#rolesUsers input') as NodeListOf<HTMLInputElement>;
      let rolesAux: any = [];
      let i : number = 0;

      this.roles .forEach((element: { checked: any; value: string; }) => {
        if (element.checked) {
          rolesAux[i]=parseInt(element.value);
          i++;
        }
      });

      let dniAnt : any=sessionStorage.getItem('dniAnt');
      let usuario= new ProfesorCreate(
        this.datosProfesor.value.dni,
        this.datosProfesor.value.email,
        this.datosProfesor.value.nombre,
        this.datosProfesor.value.apellido,
        this.datosProfesor.value.password1,
        this.datosProfesor.value.password2,
        rolesAux,
        dniAnt
         );


         this.profesorService.editarUser(usuario).subscribe({
          next:()=>{
            this.toastr.success('Profesor Editado', 'Logrado!');
          },
          error: e =>{
            this.toastr.error('Error al editar', 'Error');
          }
        })

  }

  CloseModal(){
    this.modalActive.dismiss();
  }


  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion Crea a un profesor
   * @returns
   */
  onSubmitCreate(){

    let i : number = 0;
    let rolesAux: any = [];

    this.submitted=true;
    if(this.datosProfesor.invalid)
      return;

      //PARA RECOGER LOS ROLES
      this.roles = document.querySelectorAll('#rolesUsers input') as NodeListOf<HTMLInputElement>;

      this.roles .forEach((element: { checked: any; value: string; }) => {
        if (element.checked) {
          rolesAux[i]=parseInt(element.value);
          i++;
        }
      });

      let usuario= new ProfesorCreate(
        this.datosProfesor.value.dni,
        this.datosProfesor.value.email,
        this.datosProfesor.value.nombre,
        this.datosProfesor.value.apellido,
        this.datosProfesor.value.password1,
        this.datosProfesor.value.password2,
        rolesAux,
         this.dniPersonaRegistrada
         );

         console.log(usuario);

         this.profesorService.registrarProfesor(usuario).subscribe({
          next:()=>{
            this.toastr.success('Profesor Creado', 'Logrado!');          },
          error: e =>{
            this.toastr.error('El profesor no ha podido crearse', 'Fallo');
          }
        });
  }
}
