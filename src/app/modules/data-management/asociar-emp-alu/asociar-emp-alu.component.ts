import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { Empresa } from '../../../models/empresa';
import { AsociarAlumnoEmpresaService } from '../../../services/asociar-alumno-empresa.service';

@Component({
  selector: 'app-asociar-emp-alu',
  templateUrl: './asociar-emp-alu.component.html',
  styleUrls: ['./asociar-emp-alu.component.scss']
})
export class AsociarEmpAluComponent implements OnInit {
  alumnos: Alumno[] = [];
  empresas: Empresa[] = [];

  constructor(private alumnosEmpresas: AsociarAlumnoEmpresaService) { }

  ngOnInit(): void {
    this.getAlumnos();
    this.getEmpresas();
    this.eventosCasillas();
    this.eventosFichas();

    // this.eventosCasillas();
    // this.eventosFichas();
  }

  getAlumnos(): void {
    this.alumnosEmpresas.solicitarAlumnos('117372673').subscribe(Alumno => this.alumnos = Alumno);
  }
  getEmpresas(): void {
    this.alumnosEmpresas.solicitarEmpresas('117372673').subscribe(Empresa => this.empresas = Empresa);
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
  eventosFichas() {

    var fichas = document.querySelectorAll(".listaAlumnos div");

    for (let i = 0; i < fichas.length; i++) {
      fichas[i].addEventListener("dragstart",
        function (event: any) {
          event.dataTransfer.setData("text", event.target.id);
        });
    }
  }


  /**
   * Cuando una ficha caiga en una casilla, usando el id de la ficha que pasamos en el comienzo del arrastre
   * buscamos el elemento y lo añadimos como hijo de la ficha.
   */
  eventosCasillas() {

    var casillas = document.querySelectorAll(".tablero div");

    for (let i = 0; i < casillas.length; i++) {

      // Evitamos el comportamiento por defecto
      casillas[i].addEventListener("dragover",
        function (event) {
          event.preventDefault();
        }
      );

      casillas[i].addEventListener("drop",
        function (event: any) {
          event.preventDefault();
          var data = event.dataTransfer.getData("alumno");
          if (event.target.className == "empresa" || event.target.className == "listaAlumnos") {
            data.parentNode.removeChild(data);
            event.target.appendChild(document.getElementById(data));
          }

        });
    }
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
