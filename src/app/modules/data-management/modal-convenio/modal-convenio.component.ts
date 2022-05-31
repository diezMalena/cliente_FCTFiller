import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CentroEstudios } from 'src/app/models/centroEstudios';
import { Convenio } from 'src/app/models/convenio';
import { Empresa } from 'src/app/models/empresa';
import { AuxService } from 'src/app/services/aux-service.service';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';
import { DialogService } from 'src/app/services/dialog.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-modal-convenio',
  templateUrl: './modal-convenio.component.html',
  styleUrls: ['./modal-convenio.component.scss'],
})
export class ModalConvenioComponent implements OnInit {
  /***********************************************************************/
  //#region Inicialización de variables

  public empresa?: Empresa;
  public centro?: CentroEstudios;
  public convenio?: Convenio;
  public datos: FormGroup;
  public submitted: boolean = false;
  public modo?: number;
  public modified: boolean = false;
  public title: string = '';
  public tipo: string = '';
  public numConvenio: number = 0;
  public claseInput: string = '';

  constructor(
    private modalActive: NgbActiveModal,
    private crudEmpresasService: CrudEmpresasService,
    private storageUser: LoginStorageUserService,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    public toastr: ToastrService,
    private datePipe: DatePipe,
    private auxService: AuxService
  ) {
    this.datos = new FormGroup({});

    this.crudEmpresasService.empresaTrigger.subscribe({
      next: (data: Array<any>) => {
        this.empresa = data[0];
        this.centro = data[1];
        this.modo = data[2];
        this.tipo = this.empresa?.es_privada ? 'convenio' : 'acuerdo';
        this.claseInput =
          this.modo === 1 ? 'form-control-plaintext' : 'form-control';
        // Saco el convenio y su número
        if (this.empresa?.convenio) {
          this.convenio = this.empresa.convenio;
          let part = this.empresa.convenio.cod_convenio.split('/')[1];
          this.numConvenio = parseInt(part.substring(1));
        }

        this.construirFormulario();
      },
    });
  }

  ngOnInit(): void {
    switch (this.modo) {
      case 0:
        this.title = 'Hacer ';
        break;
      case 1:
        this.title = 'Ver ';
        break;
      case 2:
        this.title = 'Editar ';
        break;
      case 3:
        this.title = 'Renovar ';
        break;
    }
    if (this.empresa?.es_privada) {
      this.title += 'convenio';
    } else {
      this.title += 'acuerdo';
    }
    this.title += ' con ' + this.empresa?.nombre;
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión del formulario

  private construirFormulario() {
    console.log(this.empresa); console.log(this.empresa?.representante)
    this.datos = this.formBuilder.group({
      convenio: this.formBuilder.group({
        num_convenio: [
          this.convenio ? this.numConvenio : 0,
          [Validators.required],
        ],
        cod_centro_convenio: [this.centro?.cod_centro_convenio],
        fecha_ini: [
          this.convenio ? this.convenio.fecha_ini : this.now,
          [Validators.required],
        ],
        fecha_fin: [this.convenio ? this.convenio.fecha_fin : this.now],
        cod_convenio: [this.convenio ? this.convenio.cod_convenio : ''],
      }),
      director: this.formBuilder.group({
        nombre: [this.centro?.director?.nombre, [Validators.required]],
        apellidos: [this.centro?.director?.apellidos, [Validators.required]],
        dni: [
          this.centro?.director?.dni,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
      }),
      centro: this.formBuilder.group({
        cod: [this.centro?.cod, [Validators.required]],
        nombre: [this.centro?.nombre, [Validators.required]],
        cif: [
          this.centro?.cif,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        provincia: [this.centro?.provincia, [Validators.required]],
        localidad: [this.centro?.localidad, [Validators.required]],
        direccion: [this.centro?.direccion, [Validators.required]],
        cp: [
          this.centro?.cp,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ],
        ],
        email: [this.centro?.email, [Validators.required, Validators.email]],
        telefono: [this.centro?.telefono, [Validators.required]],
      }),
      representante: this.formBuilder.group({
        nombre: [this.empresa?.representante?.nombre, [Validators.required]],
        apellidos: [this.empresa?.representante?.apellidos, [Validators.required]],
        dni: [
          this.empresa?.representante?.dni,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
      }),
      empresa: this.formBuilder.group({
        nombre: [this.empresa?.nombre, [Validators.required]],
        cif: [
          this.empresa?.cif,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        provincia: [this.empresa?.provincia, [Validators.required]],
        localidad: [this.empresa?.localidad, [Validators.required]],
        direccion: [this.empresa?.direccion, [Validators.required]],
        cp: [
          this.empresa?.cp,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5),
          ],
        ],
        email: [this.empresa?.email, [Validators.required, Validators.email]],
        telefono: [this.empresa?.telefono, [Validators.required]],
      }),
    });
  }

  get formulario() {
    return this.datos.controls;
  }

  onSubmit() {}

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de cambios y eventos

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Servicios - Peticiones al servidor

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Funciones auxiliares y otros

  /**
   * Cierra el modal sólo si no hay cambios sin guardar
   *
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
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
      }
      this.modalActive.close();
    }
  }

  get now() {
    return this.dateToString(new Date());
  }

  private calcFechaFin(fecha: Date) {
    return new Date(fecha.getFullYear() + 4, fecha.getMonth(), fecha.getDate());
  }

  private dateToString(fecha: Date) {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

  private stringToDate(fecha: string) {
    return this.datePipe.transform(fecha);
  }

  //#endregion
  /***********************************************************************/
}
