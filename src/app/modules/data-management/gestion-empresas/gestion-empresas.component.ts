import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { AsociarAlumnoEmpresaService } from 'src/app/services/asociar-alumno-empresa.service';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.scss']
})
export class GestionEmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  //Temporalmente, cogemos un dni de un tutor de la BBDD
  dniTutor: string = '117372673';

  constructor(
    private crudEmpresasService: CrudEmpresasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getEmpresas(): void {
    this.crudEmpresasService.getEmpresas(this.dniTutor)
    .subscribe(response => {

      }
    )
  }

}
