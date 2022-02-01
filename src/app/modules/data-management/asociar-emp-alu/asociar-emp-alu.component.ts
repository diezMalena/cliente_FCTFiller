import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { Empresa } from '../../../models/empresa';
import { Router } from '@angular/router';
import { AsociarAlumnoEmpresaService } from '../../../services/asociar-alumno-empresa.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-asociar-emp-alu',
  templateUrl: './asociar-emp-alu.component.html',
  styleUrls: ['./asociar-emp-alu.component.scss']
})
export class AsociarEmpAluComponent implements OnInit {
  alumnos: Alumno[] = [];
  empresas: Empresa[] = [];
  respuesta: any = [];
  nombreCiclo: string = '';
  dniTutor: string = '117372673';

  constructor(
    private alumnosEmpresas: AsociarAlumnoEmpresaService,
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getNombreCiclo();
    this.getAlumnos();
    this.getEmpresas();
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log(this.alumnos);
    console.log(this.empresas);
  }

  getAlumnos(): void {
    this.alumnosEmpresas.solicitarAlumnos(this.dniTutor).subscribe(Alumno => {
      this.alumnos = Alumno
      console.log(this.alumnos);
    });

  }
  getEmpresas(): void {
    this.alumnosEmpresas.solicitarEmpresas(this.dniTutor).subscribe(Empresa => {
      this.empresas = Empresa
      console.log(this.empresas);
    });

  }
  getNombreCiclo(): void {
    this.alumnosEmpresas.solicitarNombreCiclo(this.dniTutor).subscribe(
      {
        next: (response: any) => {
          this.nombreCiclo = response[0]['nombre'];
        }
      });
  }
  setCambiosEmpresas() {
    this.alumnosEmpresas.asignarAlumnos(this.dniTutor, this.empresas).subscribe(Empresa => console.log(Empresa));
  }

  GenerarAnexos() {
    /* this.alumnosEmpresas.generarAnexo('451266566Y').subscribe((response)=>{
       this.respuesta=response;
     });*/

    this.alumnosEmpresas.generarAnexo('451266566Y').subscribe({
      next: (user) => {
        this.toastr.success('Anexo Generado', 'Título');
      },
      error: e => {
        this.toastr.error('El anexo no ha podido generarse', 'Título');
      }
    })
    this.router.navigate(['/data-management/asig-alum-empresa']);
  }

}
