import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { AsociarAlumnoEmpresaService } from 'src/app/services/asociar-alumno-empresa.service';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';
import { ModalEmpresaComponent } from '../modal-empresa/modal-empresa.component';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.scss'],
})
export class GestionEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  //Temporalmente, cogemos un dni de un tutor de la BBDD
  dniTutor: string = '978528198';

  constructor(
    private crudEmpresasService: CrudEmpresasService,
    private modal: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  /**
   * Inicializa las empresas del componente mediante el servicio correspondiente
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresas(): void {
    this.crudEmpresasService
      .getEmpresas(this.dniTutor)
      .subscribe((response) => (this.empresas = response));
  }

  /**
   * Abre un modal con los detalles de la empresa, editable o no según la variable booleana
   * @param empresa la empresa en cuestión
   * @param editar true -> vista de edición; false -> vista de sólo lectura
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public mostrarEmpresa(empresa: Empresa, editar: boolean) {
    this.modal.open(ModalEmpresaComponent, { size: 'md' });
    this.crudEmpresasService.empresaTrigger.emit([empresa, editar]);
  }
}
