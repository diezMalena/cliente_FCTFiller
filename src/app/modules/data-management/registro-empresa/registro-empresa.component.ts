import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FaseForm } from 'src/app/classes/fase-form';
import { ManualRegistroEmpresasComponent } from '../../manuales/manual-registro-empresas/manual-registro-empresas.component';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss'],
})
export class RegistroEmpresaComponent implements OnInit {
  /***********************************************************************/
  //#region Inicialización del componente

  public fases: Array<FaseForm>;
  public faseActual: number;

  public submitted: boolean = false;

  public empresa: FormGroup;
  private datosEmpresa: any;
  public ubicacion: FormGroup;
  private datosUbicacion: any;
  public representante: FormGroup;
  private datosRepresentante: any;
  public ciclos: any;
  private datosCiclos: any;

  constructor(private formBuilder: FormBuilder, private modal: NgbModal) {
    this.fases = new Array<FaseForm>(5);
    this.faseActual = 1;

    this.empresa = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      telefono: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      cif: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      tipoEmpresa: ['', [Validators.required]],
    });

    this.ubicacion = this.formBuilder.group({
      localidad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      cp: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
    });

    this.representante = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: [
        '',
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
    });
  }

  ngOnInit(): void {
    this.inicializarFases();
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de formularios

  /***********************************************************************/
  //#region Getters

  get formEmpresa() {
    return this.empresa.controls;
  }

  get formUbicacion() {
    return this.ubicacion.controls;
  }

  get formRepresentante() {
    return this.representante.controls;
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Submits

  /**
   * Valida el formulario de datos de la empresa y guarda la información
   * si cumple con las validaciones
   *
   * @author Malena
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  onSubmitEmpresa(): void {
    this.submitted = true;
    if (!this.empresa.valid) return;

    this.datosEmpresa = this.empresa.value;

    this.nextFase();
    this.submitted = false;
  }

  /**
   * Valida el formulario de datos de ubicación del centro de trabajo
   * y guarda la información si cumple con las validaciones
   *
   * @author Malena
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  onSubmitUbicacion(): void {
    this.submitted = true;
    if (!this.ubicacion.valid) return;

    this.datosUbicacion = this.ubicacion.value;

    this.nextFase();
    this.submitted = false;
  }

  /**
   * Valida el formulario de datos de ubicación del centro de trabajo
   * y guarda la información si cumple con las validaciones
   *
   * @author Malena
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  onSubmitRepresentante(): void {
    this.submitted = true;
    if (!this.representante.valid) return;

    this.datosRepresentante = this.representante.value;

    this.nextFase();
    this.submitted = false;
  }

  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de las fases del registro

  /**
   * Inicializa las fases del formulario
   *
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public inicializarFases() {
    for (let i = 0; i < this.fases.length; i++) {
      let nombre: string = '';
      let abreviatura: string = '';
      switch (i + 1) {
        case 1:
          nombre = 'Empresa';
          abreviatura = nombre;
          break;
        case 2:
          nombre = 'Ubicación';
          abreviatura = nombre;
          break;
        case 3:
          nombre = 'Representante legal';
          abreviatura = 'Rpte. legal';
          break;
        case 4:
          nombre = 'Ciclos formativos';
          abreviatura = 'Ciclos';
          break;
        case 5:
          nombre = 'Resumen';
          abreviatura = nombre;
          break;
      }
      this.fases[i] = new FaseForm(i + 1, nombre, abreviatura);
    }
    this.fases[0].activar();
  }

  /**
   * Devuelve una fase del formulario
   *
   * @param i `number` Index de la fase que se quiere obtener
   * @returns `FaseForm` Fase del formulario
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  private getFase(i: number): FaseForm {
    return this.fases.find((fase) => fase.index === i)!;
  }

  /**
   * Cambia de fase siempre y cuando ésta sea accesible
   *
   * @param index Valor numérico de la fase a la que se cambia
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public cambiarFase(index: number): void {
    if (this.getFase(index).accesible) {
      this.faseActual = index;
    }
  }

  /**
   * Avanza en uno la fase actual y la activa
   *
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public nextFase(): void {
    this.faseActual++;
    this.getFase(this.faseActual).activar();
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Funciones auxiliares y otros

  /**
   * Abre un modal de ayuda
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public abrirAyuda(): void {
    this.modal.open(ManualRegistroEmpresasComponent, { size: 'lg' });
  }

  //#endregion
  /***********************************************************************/
}
