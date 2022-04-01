import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManualRegistroEmpresasComponent } from 'src/app/modules/manuales/manual-registro-empresas/manual-registro-empresas.component';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss'],
})
export class UbicacionComponent implements OnInit {
  /***********************************************************************/
  //#region Inicialización de variables y formulario

  public static readonly ubicacion: string = 'ubicacion';
  ubicacion: FormGroup;
  submitted: boolean = false;
  localidad?;
  direccion?;
  provincia?;
  cp?;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public modal: NgbModal
  ) {
    var ubicacion: string = '';
    this.localidad = '';
    this.direccion = '';
    this.provincia = '';
    this.cp = '';

    if (sessionStorage.getItem(UbicacionComponent.ubicacion) != null) {
      ubicacion = sessionStorage.getItem(UbicacionComponent.ubicacion)!;
      var datosRepre = JSON.parse(ubicacion);
      this.localidad = datosRepre['localidad'] ? datosRepre['localidad'] : '';
      this.direccion = datosRepre['direccion'] ? datosRepre['direccion'] : '';
      this.provincia = datosRepre['provincia'] ? datosRepre['provincia'] : '';
      this.cp = datosRepre['cp'] ? datosRepre['cp'] : '';
    }

    this.ubicacion = this.formBuilder.group({
      localidad: [this.localidad, [Validators.required]],
      direccion: [this.direccion, [Validators.required]],
      provincia: [this.provincia, [Validators.required]],
      cp: [
        this.cp,
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
      ],
    });
  }

  ngOnInit(): void {}

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión del formulario

  get formulario() {
    return this.ubicacion.controls;
  }

  /**
   * Valida el formulario y guarda los datos en sesión
   * @author Malena
   */
  onSubmit() {
    this.submitted = true;
    if (!this.ubicacion.valid) return;

    var localidad = this.ubicacion.value.localidad;
    var direccion = this.ubicacion.value.direccion;
    var provincia = this.ubicacion.value.provincia;
    var cp = this.ubicacion.value.cp;

    var datosUbicacion = {
      localidad: localidad,
      direccion: direccion,
      provincia: provincia,
      cp: cp,
    };

    sessionStorage.setItem(
      UbicacionComponent.ubicacion,
      JSON.stringify(datosUbicacion)
    );
    console.log(datosUbicacion);

    this.router.navigateByUrl('data-management/registro-empresa/resumen');

    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.ubicacion.reset();
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
