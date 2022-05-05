import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';
import { PreguntaModel } from 'src/app/models/cuestionarios/pregunta.model';
import { RespuestaCuestionarioModel } from 'src/app/models/cuestionarios/respuesta-cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionarios/cuestionario.service';


@Component({
  selector: 'app-contestar-cuestionario',
  templateUrl: './contestar-cuestionario.component.html',
  styleUrls: ['./contestar-cuestionario.component.scss']
})
export class ContestarCuestionarioComponent implements OnInit {

  // datos!: string;

  respuestasForm!: FormGroup;
  hasError: boolean = false;
  private unsubscribe: Subscription[] = [];
  // cuestionario!: Observable<CuestionarioModel>;
  cuestionario!: CuestionarioModel;


  constructor(
    private fb:FormBuilder,
    private cuestionarioService: CuestionarioService,
  ) {
    this.respuestasForm = this.fb.group({
      titulo: '',
      destinatario: '',
      respuestas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  respuestas() : FormArray {
    return this.respuestasForm.get("respuestas") as FormArray
  }

  nuevaRespuesta(tipo:string, pregunta:string): FormGroup {
    return this.fb.group({
      tipo: tipo,
      pregunta: pregunta,
      respuesta: '',
    });
  }

  getPregunta(i:number){
    let respuestas= this.respuestas();
    return respuestas.at(i);
  }

  addRespuesta(tipo:string, pregunta:string) {
    this.respuestas().push(this.nuevaRespuesta(tipo,pregunta));
  }

  getCuestionario() {
  //  this.cuestionarioService.getCuestionario("alumno").subscribe(data => this._cuestionario$.next(data));
  this.cuestionarioService.getCuestionario('alumno').subscribe((res) => {
    this.cuestionario = res;
    this.respuestasForm.patchValue(res);
    this.cuestionario.preguntas.forEach((element:PreguntaModel) => {
      console.log(element);
      this.addRespuesta(element.tipo, element.pregunta);
    });
  });
  }

  onSubmit() {
    const respuestaCuestionarioModel= new RespuestaCuestionarioModel();
    respuestaCuestionarioModel.setCuestionario(this.respuestasForm.value);
    console.log(respuestaCuestionarioModel);
  }

}


