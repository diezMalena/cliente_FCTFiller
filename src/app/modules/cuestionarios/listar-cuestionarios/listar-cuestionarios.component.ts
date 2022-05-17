import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionarios/cuestionario.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-listar-cuestionarios',
  templateUrl: './listar-cuestionarios.component.html',
  styleUrls: ['./listar-cuestionarios.component.scss']
})
export class ListarCuestionariosComponent implements OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtOptions: DataTables.Settings = {};
  // dtOptions: any  = {};
  dtTrigger = new Subject<any>();
  data: any;

  cuestionarios!: Observable<Array<CuestionarioModel>>;
  cuestionariosArray: Array<CuestionarioModel> = [];


  constructor(
    private cuestionarioService: CuestionarioService,
    private router: Router,
    private toastr: ToastrService,
    public dialogService: DialogService
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.cuestionariosArray);
  }

  ngOnInit(): void {

    delete this.dtOptions['language'];
    this.listarCuestionarios();

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.cuestionariosArray);
    });
  }

  public listarCuestionarios() {
    this.cuestionarioService.getCuestionarios().subscribe((response) => {
      this.cuestionariosArray = response;
      response = (this.cuestionariosArray as any).data;
      // Calling the DT trigger to manually render the table
      this.rerender();
      this.dtTrigger.next(this.cuestionariosArray);
      $.fn.dataTable.ext.errMode = 'throw';
    });
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
  }

  public editarCuestionario(id:number){
    this.router.navigate(['/cuestionarios/edicion-cuestionario/'+id]);
  }

  public async eliminarCuestionario(id: number){

    let hacerlo = await this.dialogService.confirmacion(
      'Eliminar',
      `¿Está seguro de que desea eliminar el cuestionario?: `+id
    );

    if (hacerlo) {

      this.cuestionarioService.eliminarCuestionario(id).subscribe({
      next: (res) => {
        this.toastr.success('Cuestionario Eliminado', 'Eliminado');
        this.listarCuestionarios();
      },
      error: e => {
        console.log(e);
        this.toastr.error('El cuestionario no ha podido eliminarse', 'Fallo');
      }
    })
  }else{
    this.toastr.info('Has decidido no eliminar el cuestionario', 'No eliminado');
  }
  }

}
