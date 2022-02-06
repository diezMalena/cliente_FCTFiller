import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { Empresa } from '../../../models/empresa';
import { Router } from '@angular/router';
import { AsociarAlumnoEmpresaService } from '../../../services/asociar-alumno-empresa.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-asociar-emp-alu',
  templateUrl: './asociar-emp-alu.component.html',
  styleUrls: ['./asociar-emp-alu.component.scss']
})
export class AsociarEmpAluComponent implements OnInit {
  alumnos: Alumno[] = [];
  empresas: Empresa[] = [];
  respuesta: any =[];
  nombreCiclo: string = '';
  dniTutor: string = '117372673';

  constructor(
    private alumnosEmpresas: AsociarAlumnoEmpresaService,
    private router: Router,
    private toastr: ToastrService,)
     { }

  ngOnInit(): void {
    this.getNombreCiclo();
    this.getAlumnos();
    this.getEmpresas();
    // this.eventosCasillas();
    // this.eventosFichas();

    // this.eventosCasillas();
    // this.eventosFichas();
  }

  drop(event: CdkDragDrop<string[]>) {
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
  }
  getAlumnos(): void {
    this.alumnosEmpresas.solicitarAlumnos(this.dniTutor).subscribe(Alumno => this.alumnos = Alumno);
  }
  getEmpresas(): void {
    this.alumnosEmpresas.solicitarEmpresas(this.dniTutor).subscribe(Empresa => this.empresas = Empresa);
  }
  getNombreCiclo(): void {
    this.alumnosEmpresas.solicitarNombreCiclo(this.dniTutor).subscribe(
      {
        next: (response: any) => {
          this.nombreCiclo = response[0]['nombre'];
        }
      });
  }
  setCambiosEmpresas(){
    this.alumnosEmpresas.asignarAlumnos(this.dniTutor, this.empresas).subscribe(Empresa => console.log(Empresa));
  }

  // drag(ev: any) {
  //   console.log("entra");
  //   ev.dataTransfer.setData("alumno", ev.target.id);
  // }

  // allowDrop(ev: any) {
  //   ev.preventDefault();
  // }

  // drop(ev: any) {
  //   var data = ev.dataTransfer.getData("alumno");
  //   console.log(ev.target.className);
  //   if (ev.target.className == "empresa" || ev.target.className == "listaAlumnos") {
  //     data.parentNode.removeChild(data);
  //     ev.target.appendChild(document.getElementById(data));
  //   }
  // }

  /**
   * Cuando arrastramos una ficha recogemos su id en el evento
   */
  // eventosFichas() {

  //   var fichas = document.querySelectorAll(".listaAlumnos div");

  //   for (let i = 0; i < fichas.length; i++) {
  //     fichas[i].addEventListener("dragstart",
  //       function (event: any) {
  //         event.dataTransfer.setData("text", event.target.id);
  //       });
  //   }
  // }

  // eventosCasillas() {

  //   var casillas = document.querySelectorAll(".empresa div");

  //   for (let i = 0; i < casillas.length; i++) {

  //     // Evitamos el comportamiento por defecto
  //     casillas[i].addEventListener("dragover",
  //       function (event) {
  //         event.preventDefault();
  //       }
  //     );

  //     casillas[i].addEventListener("drop",
  //       function (event: any) {
  //         event.preventDefault();
  //         var data = event.dataTransfer.getData("alumno");
  //         if (event.target.className == "empresa" || event.target.className == "listaAlumnos") {
  //           data.parentNode.removeChild(data);
  //           event.target.appendChild(document.getElementById(data));
  //         }

  //       });
  //   }
  // }


  GenerarAnexos(){
    /* this.alumnosEmpresas.generarAnexo('451266566Y').subscribe((response)=>{
       this.respuesta=response;
     });*/

     this.alumnosEmpresas.generarAnexo('3c').subscribe({
      next:(user)=>{
        this.toastr.success('Anexo Generado', 'Título');
      },
      error: e =>{
        this.toastr.error('El anexo no ha podido generarse', 'Título');
      }
    })
     this.router.navigate(['/data-management/asig-alum-empresa']);
   }

  // eventosFichas() {

  //   var fichas = document.querySelectorAll(".arrastrables div");

  //   for (let i = 0; i < fichas.length; i++) {
  //     fichas[i].addEventListener("dragstart",
  //       function (event: any) {
  //         event.dataTransfer.setData("text", event.target.id);
  //       });
  //   }
  // }

  // eventosCasillas() {

  //   var casillas = document.querySelectorAll(".tablero div") as NodeListOf <HTMLElement>;

  //   for (let i = 0; i < casillas.length; i++) {

  //     // Evitamos el comportamiento por defecto
  //     casillas[i].addEventListener("dragover",
  //       function (event: any) {
  //         event.preventDefault();
  //       }
  //     );

  //     casillas[i].addEventListener("drop",
  //       function (event: any) {
  //         event.preventDefault();

  //         this.appendChild(
  //           document.getElementById(
  //             event.dataTransfer.getData("text")
  //           )
  //         );

  //       });
  //   }
  // }

}
