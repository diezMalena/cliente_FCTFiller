import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { Empresa } from '../../../models/empresa';
import { Router } from '@angular/router';
import { AsociarAlumnoEmpresaService } from '../../../services/asociar-alumno-empresa.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';


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
  dniTutor: string = '20a';

  constructor(
    private alumnosEmpresas: AsociarAlumnoEmpresaService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getNombreCiclo();
    this.getAlumnos();
    this.getEmpresas();
  }

  /**
   * Esta función se encarga de hacer el drag and drop de los alumnos.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
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
  }

  /**
   * Esta función se encarga de obtener los alumnos del tutor logueado del servidor.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  getAlumnos(): void {
    this.alumnosEmpresas.solicitarAlumnos(this.dniTutor).subscribe(resultado => {
      this.alumnos = resultado
    });
  }

  /**
   * Esta función se encarga de obtener las empresas con sus alumnos asignados del tutor logueado del servidor.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  getEmpresas(): void {
    this.alumnosEmpresas.solicitarEmpresas(this.dniTutor).subscribe(resultado => {
      this.empresas = resultado
    });
  }

  /**
   * Esta función se encarga de obtener el nombre del curso el tutor logueado.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  getNombreCiclo(): void {
    this.alumnosEmpresas.solicitarNombreCiclo(this.dniTutor).subscribe(
      {
        next: (response: any) => {
          this.nombreCiclo = response;
        }
      }
    );
  }

  /**
   * Esta función se encarga de enviar los cambios a la base de datos
   * y comprueba que todos los datos sean correctos antes de enviar los cambios al server.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  setCambiosEmpresas() {
    var bandera = true;
    var menor = true;
    var msg = '';
    this.empresas.forEach(empresa => {
      if (empresa.nombre_responsable && bandera) {
        empresa.alumnos?.forEach(alumno => {
          if (!alumno.fecha_fin || !alumno.fecha_ini || !alumno.horario || !menor) {
            bandera = false;
          };
          if (alumno.fecha_ini! >= alumno.fecha_fin! || !bandera && menor) {
            menor = false;
            msg += `${alumno.nombre} tiene la fecha de inicio mayor que la fecha de fin.\n`;
          }
        });
      } else {
        bandera = false;
      }
    });
    if (bandera && menor) {
      var datos = {
        'empresas': this.empresas,
        'alumnos_solos': this.alumnos
      }
      this.alumnosEmpresas.asignarAlumnos(datos).subscribe();
      this.toastr.success('Cambios realizados con exito.', 'Guardado')
      this.GenerarAnexos();
    } else if (!bandera) {
      this.toastr.error('No pueden haber campos vacíos, o las fechas son incorrectas', 'Rellena campos');
    }
    if (msg != '') {
      this.toastr.error(msg, 'Fechas incorrectas')
    }

  }

/**
 * @author Laura <lauramorenoramos97@gmail.com>
 * Esta funcion te permite descargar los anexos que se han generado
 */
  GenerarAnexos(){
     this.alumnosEmpresas.generarAnexo(this.dniTutor).subscribe({
      next:(res)=>{
        const current= new Date();
        const blob = new Blob([res], {type: 'application/octet-stream'});
      FileSaver.saveAs(blob,'backup_'+current.getTime()+'.zip');
        this.toastr.success('Anexo Generado', 'Título');
      },
      error: e =>{
        console.log(e);
        this.toastr.error('El anexo no ha podido generarse', 'Generado');
      }
    })
    this.router.navigate(['/data-management/asig-alum-empresa']);
  }

}
