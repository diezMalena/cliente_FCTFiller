import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.scss']
})
export class ModalEmpresaComponent implements OnInit {
  public empresa: Empresa | undefined;
  public editar: boolean | undefined;

  constructor(
    private modalActive: NgbActiveModal,
    private crudEmpresasService: CrudEmpresasService
  ) {
    this.crudEmpresasService.empresaTrigger.subscribe((data: any) => {
      this.empresa = data[0];
      this.editar = data[1];
    })
  }

  ngOnInit(): void {
  }

}
