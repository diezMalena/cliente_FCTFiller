import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  public datosConvenio: FormGroup;
  public submitted: boolean = false;
  public modo: number = 0;
  public modified: boolean = false;
  public title: string = '';
  public tipo: string = '';
  public numConvenio: number = 0;
  public claseInput: string = '';
  public provincias?: string[];
  public localidades?: string[];

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
    this.datosConvenio = new FormGroup({});

    this.centro = this.storageUser.getUser()?.centro;
    this.crudEmpresasService.empresaTrigger.subscribe({
      next: (data: Array<any>) => {
        this.empresa = data[0];
        this.modo = data[1];
        this.tipo = this.empresa?.es_privada ? 'convenio' : 'acuerdo';
        this.getProvincias();
        // Saco el convenio y su número
        if (this.empresa?.convenio) {
          this.convenio = this.empresa.convenio;
          let part = this.empresa.convenio.cod_convenio.split('/')[1];
          this.numConvenio = parseInt(part.substring(1));
        }

        switch (this.modo) {
          case 1:
            this.claseInput = 'form-control-plaintext';
            break;
          default:
            this.claseInput = 'form-control';
        }

        // this.construirFormulario();
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

  get formulario() {
    return this.datosConvenio.controls;
  }

  onSubmit() {}

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de cambios y eventos

  /**
   * Cambia la provincia y refresca las localidades
   *
   * @param event
   * @author David Sánchez Barragán
   */
  cambiarProvincia(event: any) {
    // this.formUbicacion['provincia'].setValue(event.target.value);
    this.getLocalidades(event.target.value);
  }

  /**
   * Cambia la ciudad
   *
   * @param event
   * @author David Sánchez Barragán
   */
  cambiarCiudad(event: any) {
    // this.formUbicacion['localidad'].setValue(event.target.value);
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Servicios - Peticiones al servidor

  /**
   * Obtiene las provincias de la base de datos
   *
   * @author David Sánchez Barragán
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  private getProvincias(): void {
    this.auxService.listarProvincias().subscribe({
      next: (respuesta) => {
        this.provincias = ['Seleccione una...'];
        this.provincias = this.provincias.concat(respuesta);
      },
    });
  }

  /**
   * Obtiene una lista de municipios filtrando por provincia
   * @param provincia provincia por la que se filtra
   *
   * @author David Sánchez Barragán
   */
  private getLocalidades(provincia: string): void {
    this.auxService.listarCiudades(provincia).subscribe({
      next: (response) => {
        this.localidades = response;
      },
    });
  }

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
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  get fecha_ini() {
    return this.datePipe.transform(this.convenio?.fecha_ini, 'yyyy-MM-dd');
  }

  get fecha_fin() {
    return this.datePipe.transform(this.convenio?.fecha_fin, 'yyyy-MM-dd');
  }

  //#endregion
  /***********************************************************************/
}
