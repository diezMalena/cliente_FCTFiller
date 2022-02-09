import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
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
        this.datosEmpresa = this.formBuilder.group({
          cif: [
            this.empresa?.cif,
            [
              Validators.required,
              Validators.minLength(9),
              Validators.maxLength(9),
            ],
          ],
          nombre: [this.empresa?.nombre, [Validators.required]],
          telefono: [this.empresa?.telefono, [Validators.required]],
          email: [this.empresa?.email, [Validators.required, Validators.email]],
          provincia: [this.empresa?.provincia, [Validators.required]],
          localidad: [this.empresa?.localidad, [Validators.required]],
          cp: [
            this.empresa?.cp,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(5),
            ],
          ],
          direccion: [this.empresa?.direccion, [Validators.required]],
        });
      },
    });
  }

  ngOnInit(): void {}

  get formulario() {
    return this.datosEmpresa.controls;
  }

  onSubmit() {
    let datos = this.datosEmpresa.value;
    let empresaEditada = new Empresa(
      this.empresa?.id!,
      datos.cif,
      datos.nombre,
      datos.email,
      datos.telefono,
      datos.localidad,
      datos.provincia,
      datos.direccion,
      datos.cp
    );

    if (this.datosEmpresa.invalid) {
      return;
    }
    console.log('Validado');
  }
}
