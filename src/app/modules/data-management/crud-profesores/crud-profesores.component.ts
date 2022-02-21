import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';


@Component({
  selector: 'app-crud-profesores',
  templateUrl: './crud-profesores.component.html',
  styleUrls: ['./crud-profesores.component.scss']
})
export class CrudProfesoresComponent implements OnInit {

  profesores: any =[];
  profesor: any = [];
  constructor(
    private profesoresService: CrudProfesoresService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.verProfesores();
  }

  public verProfesores(){
    this.profesoresService.getProfesores().subscribe((response)=>{
      this.profesores=response;
    })
  }



  public registrarProfesor(){

  }

  public verProfesor(dni_profesor: string){
    this.profesoresService.getProfesor(dni_profesor).subscribe((response)=>{
      this.profesor=response;
      console.log(response);
    })
  }

  public eliminarProfesor(dni_profesor: string){
    this.profesoresService.eliminarProfesor(dni_profesor).subscribe({
      next:(res)=>{
        this.toastr.success('Profesor Eliminado', 'Eliminado');
        this.verProfesores();
      },
      error: e =>{
        console.log(e);
        this.toastr.error('El profesor no ha podido eliminarse', 'Fallo');
      }
    })
  }

  public modificarProfesor(dni_profesor: string){

  }
}
