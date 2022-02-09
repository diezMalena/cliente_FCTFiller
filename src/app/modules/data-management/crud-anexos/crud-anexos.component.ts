import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anexo } from 'src/app/models/anexo';
import { AnexoService } from 'src/app/services/crud-anexos.service';

@Component({
  selector: 'app-crud-anexos',
  templateUrl: './crud-anexos.component.html',
  styleUrls: ['./crud-anexos.component.scss']
})
export class CrudAnexosComponent implements OnInit {
  anexos: Anexo[] = [];
  respuesta: any =[];
  dni_tutor: string = '3c';
  codigo: string = '';

  constructor(
    private anexoService: AnexoService,
    private router: Router,
    private toastr: ToastrService,
    ){ }

  ngOnInit(): void {
    this.verAnexos();
  }


  verAnexos(): void {
    this.anexoService.verAnexos(this.dni_tutor).subscribe(Anexo => this.anexos = Anexo);
  }

  descargarAnexo(codigo:string): void {
    this.anexoService.descargarAnexo(this.dni_tutor,codigo).subscribe(Anexo => this.anexos = Anexo);
  }

  descgargarTodo(): void{
    this.anexoService.descargarTodo(this.dni_tutor).subscribe(Anexo => this.anexos = Anexo);
  }

  eliminarAnexo(codigo:string): void{

    this.anexoService.eliminarAnexo(this.dni_tutor,codigo).subscribe(Anexo => this.anexos = Anexo);
  }


}
