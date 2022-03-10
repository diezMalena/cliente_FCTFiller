import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { Grupo } from 'src/app/models/grupo';
import { ModoEdicion } from 'src/app/models/modoEdicion';
import { AuxService } from 'src/app/services/aux-service.service';
import { CrudAlumnosService } from 'src/app/services/crud-alumnos.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-modal-alumno',
  templateUrl: './modal-alumno.component.html',
  styleUrls: ['./modal-alumno.component.scss']
})
export class ModalAlumnoComponent implements OnInit {

  public alumno?: Alumno;
  public modosEdicion: typeof ModoEdicion = ModoEdicion;
  public modo?: number;
  public datosAlumno: FormGroup;
  public listadoProvincias?: string[];
  public listadoCiudades?: string[];
  public listadoGrupos?: Grupo[];
  public listadoAlumnos?: Alumno[];
  public submitted: boolean = false;
  public modified: boolean = false;
  constructor(
    private modalActive: NgbActiveModal,
    private crudAlumnosService: CrudAlumnosService,
    private auxService: AuxService,
    private loginService: LoginStorageUserService,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    public toastr: ToastrService
  ) {

    this.datosAlumno = this.formBuilder.group({});

    this.crudAlumnosService.alumnoTrigger.subscribe({
      next: (data: Array<any>) => {
        this.alumno = data[0];
        this.modo = data[1];

        this.construirFormulario();
        this.obtenerListaGrupos();
        this.obtenerListaProvincias();


      },
    });
  }


  ngOnInit(): void {
    this.onChanges();
  }


  construirFormulario() {
    this.datosAlumno = this.formBuilder.group({
      cod_alumno: [
        this.alumno?.cod_alumno,
        [Validators.required, Validators.min(0)],
      ],
      dni: [
        this.alumno?.dni,
        [Validators.required],
      ],
      email: [
        this.alumno?.email,
        [Validators.required, Validators.email]
      ],
      password: [
        this.alumno?.password,
        (this.modo !== this.modosEdicion.detalle ? [] : [Validators.required])
      ],
      nombre: [
        this.alumno?.nombre,
        [Validators.required]
      ],
      apellidos: [
        this.alumno?.apellidos,
        [Validators.required]
      ],
      provincia: [
        this.alumno?.provincia,
        [Validators.required]
      ],
      localidad: [
        this.alumno?.localidad,
        [Validators.required]
      ],
      va_a_fct: [
        parseInt(this.alumno?.va_a_fct + '') != 0
      ],
      matricula_cod: [
        this.alumno?.matricula_cod,
        [Validators.required]
      ],
      matricula_cod_grupo: [
        this.alumno?.matricula_cod_grupo,
        [Validators.required]
      ]
    });
  }

  get formulario() {
    return this.datosAlumno.controls;
  }

  /**
   * Método que se ejecutará al realizar la acción submit en el formulario
   * @returns `void`
   * @author David Sánchez Barragán
   */
  onSubmit() {
    this.submitted = true;

    let datos = this.datosAlumno.value;
    let alumnoEditado = new Alumno(
      datos.nombre,
      datos.dni,
      datos.va_a_fct ? 1 : 0,
      '',
      new Date(),
      new Date(),
      datos.cod_alumno,
      datos.email,
      datos.apellidos,
      datos.password,
      datos.provincia,
      datos.localidad,
      this.alumno?.dni,
      datos.matricula_cod,
      this.alumno?.matricula_cod_centro,
      datos.matricula_cod_grupo
    );

    if (this.datosAlumno.invalid) {
      return;
    } else {
      this.modified = false;

      if (this.modo == this.modosEdicion.nuevo) {
        this.registrarAlumno(alumnoEditado);
      } else {
        this.actualizarAlumno(alumnoEditado);
      }

      this.modalActive.close();
    }
  }

  /**
   * Método que se ejecutará al realizar la acción submit en el formulario
   * @returns `void`
   * @author David Sánchez Barragán
   */
  onChanges() {
    this.datosAlumno?.valueChanges.subscribe((val) => {
      if (!this.modified) {
        this.modified = true;
      }
    });
  }

  /**
   * Método que se ejecutará al cerrar el modal
   * @returns `void`
   * @author David Sánchez Barragán
   */
  async closeModal() {
    if (!this.modified) {
      this.modalActive.close();
    } else {
      let guardar = await this.dialogService.confirmacion(
        'Guardar cambios',
        `Hay cambios sin guardar. ¿Quiere guardarlos antes de salir?`
      );
      if (guardar) {
        this.onSubmit();
      } else {
        this.modalActive.close();
      }
    }
  }

  cambiarProvincia(event: any) {
    this.formulario['provincia'].setValue(event.target.value);
    this.obtenerListaCiudades(event.target.value);
  }

  cambiarCiudad(event: any) {
    this.formulario['localidad'].setValue(event.target.value);
  }

  cambiarGrupo(event: any) {
    this.formulario['matricula_cod_grupo'].setValue(event.target.value);
  }

  cambiarVaAFCT(event:any) {
    this.formulario['va_a_fct'].setValue(event.target.checked);
  }

  obtenerListaGrupos() {
    this.crudAlumnosService.listarGrupos().subscribe({
      next: (respuesta) => {
        if (this.modo == this.modosEdicion.nuevo) {
          this.listadoGrupos = [new Grupo('', 'Seleccione uno...')];
          this.listadoGrupos = this.listadoGrupos.concat(respuesta);
        } else {
          this.listadoGrupos = respuesta;
        }
      }
    });
  }

  obtenerListaProvincias() {
    this.auxService.listarProvincias().subscribe({
      next: (respuesta) => {

        if (this.modo != this.modosEdicion.detalle) {
          this.listadoProvincias = ['Seleccione uno...'];
          this.listadoProvincias = this.listadoProvincias.concat(respuesta);
        } else {
          this.listadoProvincias = [''];
          this.listadoProvincias = this.listadoProvincias.concat(respuesta);
        }

        if(this.modo != this.modosEdicion.nuevo) {
          this.obtenerListaCiudades(this.alumno?.provincia!);
        }
      }
    });
  }

  obtenerListaCiudades(provincia: string) {
    this.auxService.listarCiudades(provincia).subscribe({
      next: (repuesta) => {
        this.listadoCiudades = repuesta;
      }
    });
  }

  actualizarAlumno(alumno: Alumno) {
    this.crudAlumnosService.actualizarAlumno(alumno).subscribe({
      next: (reponse: any) => {
        this.toastr.success('Alumno actualizado correctamente');
        this.obtenerAlumnos();
      },
      error: (error) => {
        this.toastr.error('Se produjo un error al actualizar al alumno');
      }
    });
  }

  registrarAlumno(alumno: Alumno) {
    this.crudAlumnosService.registrarAlumno(alumno).subscribe({
      next: (response: any) => {
        this.toastr.success('Alumno registrado correctamente');
        this.obtenerAlumnos();
      },
      error: (error) => {
        this.toastr.success('Se produjo un error al registrar al alumno');
      }
    });
  }

  obtenerAlumnos() {
    this.crudAlumnosService.listarAlumnos(this.loginService.getUser()?.dni).subscribe({
      next: (response) => {
        this.crudAlumnosService.setAlumnosArray(response);
      }
    })
  }

}
