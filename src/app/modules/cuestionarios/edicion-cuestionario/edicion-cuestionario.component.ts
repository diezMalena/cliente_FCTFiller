import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, Subscription, throwError } from 'rxjs';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';
import { PreguntaModel } from 'src/app/models/cuestionarios/pregunta.model';
import { CuestionarioService } from 'src/app/services/cuestionarios/cuestionario.service';
import { ManualCrearCuestionario } from '../../manuales/manual-crear-cuestionario/manual-crear-cuestionario.component';

@Component({
  selector: 'app-creacion-cuestionario',
  templateUrl: './edicion-cuestionario.component.html',
  styleUrls: ['./edicion-cuestionario.component.scss']
})
export class EdicionCuestionarioComponent implements OnInit {

  // datos!: string;
  cuestionarioForm!: FormGroup;
  hasError: boolean = false;
  private unsubscribe: Subscription[] = [];
  cuestionario!: CuestionarioModel;
  cuestionarioID:any;


  constructor(
    private fb:FormBuilder,
    private cuestionarioService: CuestionarioService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
  ){
    this.cuestionarioID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cuestionarioForm = this.fb.group({
      id: 0,
      titulo: '',
      destinatario: '',
      preguntas: this.fb.array([]),
    });
    this.getCuestionario();
  }

  preguntas() : FormArray {
    return this.cuestionarioForm.get("preguntas") as FormArray
  }

  nuevaPregunta(): FormGroup {

    return this.fb.group({
      tipo: '',
      pregunta: '',
    //   tipo: ['',Validators.compose([
    //     Validators.required
    // ]),],
    //   pregunta: ['',Validators.compose([
    //     Validators.required
    // ]),]
    });
  }

  nuevaPreguntaExistente(tipo:string, pregunta:string): FormGroup {
    return this.fb.group({
      tipo: tipo,
      pregunta: pregunta,
    });
  }

  addPreguntaExistente(tipo:string, pregunta:string) {
    this.preguntas().push(this.nuevaPreguntaExistente(tipo,pregunta));
  }

  getCuestionario() {
    this.cuestionarioService.getCuestionarioEdicion(this.cuestionarioID).subscribe((res) => {
      this.cuestionario = res;
      this.cuestionarioForm.patchValue(res);
      this.cuestionario.preguntas.forEach((element:PreguntaModel) => {
        this.addPreguntaExistente(element.tipo, element.pregunta);
      });
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
    const storageSub = this.cuestionarioService.update(cuestionarioModel)
    .pipe(first(),catchError((e) => {
      this.toastr.error('El cuestionario no ha podido editarse', 'Error');
      return throwError(new Error(e));
    }))
    .subscribe((cuestionario: any) => {
      if (cuestionario) {
        var o: any = cuestionario;
        this.toastr.success("Formulario editado con éxito", 'Añadido');
        this.router.navigate(['/cuestionarios/listar-cuestionarios']);
      } else {
        this.hasError = true;
      }
    })
    this.unsubscribe.push(storageSub);
  }
  formularioCuestionario = new FormGroup({
    Tipo: new FormControl(''),
    Pregunta: new FormControl(''),
  });


  public abrirAyuda(): void {
    this.modal.open(ManualCrearCuestionario, { size: 'lg' });
  }

}
