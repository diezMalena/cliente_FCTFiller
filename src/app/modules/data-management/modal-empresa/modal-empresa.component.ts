import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { Trabajador } from 'src/app/models/trabajador';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.scss'],
})
export class ModalEmpresaComponent implements OnInit {
  public empresa: Empresa | undefined;
  public editar: boolean | undefined;
  public datosEmpresa: FormGroup;
  public submitted: boolean = false;
  public modified: boolean = false;

  constructor(
    private modalActive: NgbActiveModal,
    private crudEmpresasService: CrudEmpresasService,
    private formBuilder: FormBuilder
  ) {
    //Atención a la ñapa
    //He tenido que crear un formGroup vacío para que se rellenase con la información asíncrona dentro del subscribe
    this.datosEmpresa = this.formBuilder.group({});

    this.crudEmpresasService.empresaTrigger.subscribe({
      next: (data: Array<any>) => {
        this.empresa = data[0];
        this.editar = data[1];

        this.construirFormulario();
      },
    });
  }

  ngOnInit(): void {
    this.onChanges();
  }

  get formulario() {
    return this.datosEmpresa.controls;
  }

  // /**
  //  * Obtiene el representante legal de una empresa
  //  * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
  //  */
  // getRepresentante() {
  //   this.crudEmpresasService.getRepresentante(this.empresa!.id).subscribe({
  //     next: (representante) => {
  //       this.empresa!.representante = representante;
  //     },
  //   });
  // }

  /**
   * Construye el formulario reactivo
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  construirFormulario() {
    this.datosEmpresa = this.formBuilder.group({
      cif: [
        this.empresa?.cif,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      nombre_empresa: [this.empresa?.nombre, [Validators.required]],
      telefono: [this.empresa?.telefono, [Validators.required]],
      email_empresa: [
        this.empresa?.email,
        [Validators.required, Validators.email],
      ],
      provincia: [this.empresa?.provincia, [Validators.required]],
      localidad: [this.empresa?.localidad, [Validators.required]],
      cp: [
        this.empresa?.cp,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
      direccion: [this.empresa?.direccion, [Validators.required]],
      nombre_representante: [
        this.empresa?.representante?.nombre,
        [Validators.required],
      ],
      apellidos: [
        this.empresa?.representante?.apellidos,
        [Validators.required],
      ],
      dni: [
        this.empresa?.representante?.dni,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      email_representante: [
        this.empresa?.representante?.email,
        [Validators.required],
      ],
    });
  }

  /**
   * Detecta los cambios en el formulario y, si hay, pone una variable bandera a true
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  onChanges(): void {
    this.datosEmpresa.valueChanges.subscribe((val) => {
      if (!this.modified) {
        this.modified = true;
        console.log('Modificado');
      }
    });
  }

  /**
   * Valida el formulario con los datos introducidos
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  onSubmit() {
    let datos = this.datosEmpresa.value;
    let representanteEditado = new Trabajador(
      datos.dni,
      datos.email_representante,
      datos.nombre_representante,
      datos.apellidos,
      this.empresa?.id!
    );

    let empresaEditada = new Empresa(
      this.empresa?.id!,
      datos.cif,
      datos.nombre_empresa,
      undefined,
      undefined,
      datos.email_empresa,
      datos.telefono,
      datos.localidad,
      datos.provincia,
      datos.direccion,
      datos.cp,
      representanteEditado
    );

    if (this.datosEmpresa.invalid) {
      return;
    } else {
      this.modified = false;
      this.updateEmpresa(empresaEditada);
      this.updateRepresentante(representanteEditado);
    }
    console.log('Validado');
  }

  /**
   * Actualiza los datos de la empresa en la base de datos
   * @param empresa La empresa a actualizar
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  updateEmpresa(empresa: Empresa) {
    this.crudEmpresasService.updateEmpresa(empresa).subscribe({
      next: (response: any) => {
        this.empresa = empresa;
        console.log(response.message);
        this.updateRepresentante(empresa.representante!);
      },
    });
  }

  /**
   * Actualiza el representante legal de una empresa
   * @param representante El representante legal de la empresa
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  updateRepresentante(representante: Trabajador) {
    this.crudEmpresasService.updateRepresentante(representante).subscribe({
      next: (response: any) => {
        this.empresa!.representante = representante;
        console.log(response.message);
      }
    });
  }

  /**
   * Cierra el modal sólo si no hay cambios sin guardar
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  closeModal() {
    if (!this.modified) {
      this.modalActive.close();
    } else {
      console.log('No puedes salir');
      //this.modalActive.close();
    }
  }
}
