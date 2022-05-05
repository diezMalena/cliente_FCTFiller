import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, Subscription, throwError } from 'rxjs';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionarios/cuestionario.service';
import { ManualCrearCuestionario } from '../../manuales/manual-crear-cuestionario/manual-crear-cuestionario.component';

@Component({
  selector: 'app-creacion-cuestionario',
  templateUrl: './creacion-cuestionario.component.html',
  styleUrls: ['./creacion-cuestionario.component.scss']
})
export class CreacionCuestionarioComponent implements OnInit {
  datos!: string;

  cuestionarioForm!: FormGroup;
  hasError: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb:FormBuilder,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private modal: NgbModal,
    ) {

    this.cuestionarioForm = this.fb.group({
      titulo: '',
      destinatario: '',
      preguntas: this.fb.array([]),
    });

  }

  preguntas() : FormArray {
    return this.cuestionarioForm.get("preguntas") as FormArray
  }

  nuevaPregunta(): FormGroup {
    return this.fb.group({
      tipo: '',
      pregunta: '',
    });
  }

  addPregunta() {
    this.preguntas().push(this.nuevaPregunta());
  }

  borrarPregunta(i:number) {
    this.preguntas().removeAt(i);
  }

  onSubmit() {
    const cuestionarioModel= new CuestionarioModel();
    cuestionarioModel.setCuestionario(this.cuestionarioForm.value);
    const storageSub = this.cuestionarioService.add(cuestionarioModel)
    .pipe(first(),catchError((e) => {
      this.toastr.error('El cuestionario no ha podido guardarse', 'Error');
      return throwError(new Error(e));
    }))
    .subscribe((cuestionario: any) => {
      if (cuestionario) {
        var o: any = cuestionario;
        this.toastr.success("Formulario añadido con éxito", 'Añadido');
      } else {
        this.hasError = true;
      }
    })
    this.unsubscribe.push(storageSub);
  }
  ngOnInit(): void {
  }

  formularioCuestionario = new FormGroup({
    Tipo: new FormControl(''),
    Pregunta: new FormControl(''),
  });



  public abrirAyuda(): void {
    this.modal.open(ManualCrearCuestionario, { size: 'lg' });
  }

}
