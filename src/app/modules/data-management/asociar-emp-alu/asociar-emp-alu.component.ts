import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../../models/alumno';
import { Empresa } from '../../../models/empresa';
import { Router } from '@angular/router';
import { AsociarAlumnoEmpresaService } from '../../../services/asociar-alumno-empresa.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  dniTutor: string = '4d';
  // formulario: FormGroup;
  // submitted: boolean = false;

  constructor(
    private alumnosEmpresas: AsociarAlumnoEmpresaService,
    private router: Router,
    private toastr: ToastrService,
    // private formBuilder: FormBuilder,
  ) {
    // this.formulario = this.formBuilder.group({
    //   empresasFormulario: this.formBuilder.array([]),
    //   alumnosFormulario: this.formBuilder.array([])
    // });
  }

  ngOnInit(): void {
    // this.crearFormulario();
    this.getNombreCiclo();
    this.getAlumnos();
    this.getEmpresas();
  }

  // crearFormulario() {
  //   this.formulario = this.formBuilder.group({
  //     empresasFormulario: this.formBuilder.array([]),
  //     alumnosFormulario: this.formBuilder.array([])
  //   })
  // }

  // get empresasFormulario(): FormArray {
  //   return this.formulario.get('empresasFormulario') as FormArray;
  // }

  // get alumnosFormulario(): FormArray {
  //   return this.formulario.get('alumnosFormulario') as FormArray;
  // }

  // anadirEmpresaFormulario() {
  //   const empresa = this.formBuilder.group({
  //     responsable: ["", [Validators.required]],
  //   })

  //   this.empresasFormulario.push(empresa);
  // }

  // anadirAlumnosFormulario() {
  //   const alumnos = this.formBuilder.group({
  //     horario: ["", [Validators.required]],
  //     inicio: ["", [Validators.required]],
  //     fin: ["", [Validators.required]],
  //   })

  //   this.alumnosFormulario.push(alumnos);
  // }

  // onSubmit() {

  // }

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
    console.log(this.empresas);
  }

  getAlumnos(): void {
    this.alumnosEmpresas.solicitarAlumnos(this.dniTutor).subscribe(resultado => {
      this.alumnos = resultado
    });
  }

  getEmpresas(): void {
    this.alumnosEmpresas.solicitarEmpresas(this.dniTutor).subscribe(resultado => {
      this.empresas = resultado
      // this.empresas.forEach(empresa => {
      //   this.anadirEmpresaFormulario();
      //   empresa.alumnos?.forEach(element => {
      //     this.anadirAlumnosFormulario();
      //   });
      // });
    });
  }

  getNombreCiclo(): void {
    this.alumnosEmpresas.solicitarNombreCiclo(this.dniTutor).subscribe(
      {
        next: (response: any) => {
          this.nombreCiclo = response;
        }
      }
    );
  }

  setCambiosEmpresas() {
    var datos = {
      'empresas': this.empresas,
      'alumnos_solos': this.alumnos
    }
    this.alumnosEmpresas.asignarAlumnos(datos).subscribe();
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
