import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CuestionarioRespondidoModel } from 'src/app/models/cuestionarios/cuestionarioRespondido.model';
import { CuestionariosRespondidosMediasModel } from 'src/app/models/cuestionarios/cuestionariosRespondidosMedias.model';
import { CursoAcademicoModel } from 'src/app/models/cuestionarios/cursoAcademico.model';
import { CuestionarioRespondidoService } from 'src/app/services/cuestionarios/cuestionarioRespondido.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-listar-respuestas',
  templateUrl: './listar-respuestas.component.html',
  styleUrls: ['./listar-respuestas.component.scss']
})
export class ListarRespuestasComponent implements OnInit {

  filtrosGraficasForm!: FormGroup;
  mediaCuestionarios:Array<CuestionariosRespondidosMediasModel>=[];
  usuario;
  cursoAcademicoSeleccionado!: string;
  destinatarioSeleccionado: string = "alumno";
  cursosAcademicos:Array<CursoAcademicoModel>=[];
  cuestionarios!: Array<CuestionarioRespondidoModel>;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtOptions: DataTables.Settings = {};
  // dtOptions: any  = {};
  dtTrigger = new Subject<any>();

  constructor(
    private cuestionarioRespondidoService: CuestionarioRespondidoService,
    private storageUser: LoginStorageUserService,
    private fb:FormBuilder,
  ) {
    this.usuario = this.storageUser.getUser()

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.cuestionarios);
  }

  ngOnInit(): void {

    delete this.dtOptions['language'];

    this.filtrosGraficasForm = this.fb.group({
      curso_academico: [
        ""
      ],
      destinatario: [
        ""
      ],})


    this.obtenerCursosAcademicos();

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.cuestionarios);
    });
  }

  public inicializarForm(){
    this.filtrosGraficasForm = this.fb.group({
      curso_academico: [
        this.cursoAcademicoSeleccionado
      ],
      destinatario: [
        this.destinatarioSeleccionado
      ],})
  }

  public changeCursoAcademico(event:any){
    this.cursoAcademicoSeleccionado=event.target.value;
    this.obtenerDatosGraficos();
    this.listarCuestionariosRespondidos();
  }

  public changeDestinatario(event:any){
    this.destinatarioSeleccionado=event.target.value;
    this.obtenerDatosGraficos();
    this.listarCuestionariosRespondidos();
  }


  public obtenerCursosAcademicos() {
    this.cuestionarioRespondidoService.obtenerCursoAcademico().subscribe((response) => {
      this.cursosAcademicos = response;
      if(this.cursosAcademicos.length>0){
        this.cursoAcademicoSeleccionado=this.cursosAcademicos[0].curso_academico;
      }
      this.inicializarForm();
      this.obtenerDatosGraficos();
      this.listarCuestionariosRespondidos();
    });
  }


  public obtenerDatosGraficos() {
    this.cuestionarioRespondidoService.obtenerMediasCuestionariosRespondidos(this.cursoAcademicoSeleccionado , this.destinatarioSeleccionado, this.usuario?.cod_centro ).subscribe((response) => {
      this.mediaCuestionarios = response;
    });
  }


  public listarCuestionariosRespondidos() {
    this.cuestionarioRespondidoService.obtenerCuestionariosRespondidos(this.cursoAcademicoSeleccionado , this.destinatarioSeleccionado, this.usuario?.cod_centro ).subscribe((response) => {
      this.cuestionarios = response;

      this.rerender();
      this.dtTrigger.next(this.cuestionarios);
      $.fn.dataTable.ext.errMode = 'throw';
    });
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
  }

  public descargarCuestionarioRespondido(id:number) {

  }







}
