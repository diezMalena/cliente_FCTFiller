import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Alumno } from 'src/app/models/alumno';
import { AuxService } from 'src/app/services/aux-service.service';
import { CrudAlumnosService } from 'src/app/services/crud-alumnos.service';

@Component({
  selector: 'app-modal-alumno',
  templateUrl: './modal-alumno.component.html',
  styleUrls: ['./modal-alumno.component.scss']
})
export class ModalAlumnoComponent implements OnInit {

  public alumno?: Alumno;
  public editar?: boolean;
  public datosAlumno: FormGroup;
  public listadoProvincias?: string[];
  public listadoCiudades?: string[];
  public submitted: boolean = false;
  public modified: boolean = false;
  constructor(
    private modalActive: NgbActiveModal,
    private crudAlumnosService: CrudAlumnosService,
    private auxService: AuxService,
    private formBuilder: FormBuilder
  ) {

    this.datosAlumno = this.formBuilder.group({});

    this.crudAlumnosService.alumnoTrigger.subscribe({
      next: (data: Array<any>) => {
        this.alumno = data[0];
        this.editar = data[1];

        this.construirFormulario();

        this.obtenerListaProvincias();
        this.obtenerListaCiudades(this.alumno?.provincia!);
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
        (this.editar ? [] : [Validators.required])
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
    let datos = this.datosAlumno.value;
    let alumnoEditado = new Alumno(
      datos.nombre,
      datos.dni,
      new Uint8Array(0),
      '',
      new Date(),
      new Date(),
      datos.cod_alumno,
      datos.email,
      datos.apellidos,
      datos.password,
      datos.provincia,
      datos.localidad,
      this.alumno?.dni
    );

    console.log(JSON.stringify(alumnoEditado));

    if (this.datosAlumno.invalid) {
    console.log('no valido');

      return;

    } else {
      this.modified = false;
      this.actualizarAlumno(alumnoEditado);
    }
    console.log('Validado');
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
  closeModal() {
    if (!this.modified) {
      this.modalActive.close();
    }
  }

  cambiarProvincia(event: any) {
    this.formulario['provincia'].setValue(event.target.value);
    this.obtenerListaCiudades(event.target.value);
  }

  cambiarCiudad(event: any) {
    this.formulario['localidad'].setValue(event.target.value);
  }

  obtenerListaProvincias() {
    this.auxService.listarProvincias().subscribe({
      next: (respuesta) => {
        this.listadoProvincias = respuesta;
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
      next: (reponse : any) => {
        console.log(reponse.message);
      }
    });
  }

}
