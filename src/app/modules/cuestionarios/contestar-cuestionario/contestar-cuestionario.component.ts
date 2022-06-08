import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, first, Observable, Subscription, throwError } from 'rxjs';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';
import { PreguntaModel } from 'src/app/models/cuestionarios/pregunta.model';
import { RespuestaCuestionarioModel } from 'src/app/models/cuestionarios/respuesta-cuestionario.model';
import { CuestionarioService } from 'src/app/services/cuestionarios/cuestionario.service';
import { CuestionarioRespondidoService } from 'src/app/services/cuestionarios/cuestionarioRespondido.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { CuestionarioTutorEmpresaModel } from 'src/app/models/cuestionarios/cuestionarios-tutor-empresa.model';


@Component({
  selector: 'app-contestar-cuestionario',
  templateUrl: './contestar-cuestionario.component.html',
  styleUrls: ['./contestar-cuestionario.component.scss'],
})
export class ContestarCuestionarioComponent implements OnInit {

  respuestasForm!: FormGroup;
  hasError: boolean = false;
  private unsubscribe: Subscription[] = [];
  cuestionario!: CuestionarioModel;
  usuarioCuestionario!: string|null;
  usuario;
  alumnoTutorEmpresa!: CuestionarioTutorEmpresaModel;

  constructor(
    private fb:FormBuilder,
    private toastr: ToastrService,
    private cuestionarioService: CuestionarioService,
    private cuestionarioRespondidoService: CuestionarioRespondidoService,
    private route: ActivatedRoute,
    private router: Router,
    private storageUser: LoginStorageUserService,

  ) {
    this.usuario = storageUser.getUser();
  }

  ngOnInit(): void {
    this.route.queryParamMap
    .subscribe((params) => {
      this.usuarioCuestionario = this.route.snapshot.paramMap.get('tipo');
      if (this.usuarioCuestionario=='alumno'){
        this.respuestasForm = this.fb.group({
          titulo: '',
          destinatario: '',
          codigo_centro: this.usuario?.cod_centro,
          id_usuario: this.usuario?.dni,
          ciclo: this.usuario?.cod_grupo,
          curso_academico: this.usuario?.curso_academico,
          respuestas: this.fb.array([]),
        });
        this.getCuestionario(this.usuario?.cod_centro);
      }else{
        this.respuestasForm = this.fb.group({
          titulo: '',
          destinatario: '',
          codigo_centro: params.get('cod_centro'),
          id_usuario: params.get('dni_alumno'),
          ciclo: params.get('cod_grupo'),
          curso_academico: params.get('curso_academico'),
          respuestas: this.fb.array([]),
          dni_tutor_empresa: this.usuario?.dni,
        });
        this.getCuestionario(params.get('cod_centro'));
      }
      });
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

  getCuestionario(cod_centro:string|undefined|null) {
  this.cuestionarioService.getCuestionario(this.usuarioCuestionario, cod_centro).subscribe((res) => {
    this.cuestionario = res;
    if(!this.cuestionario.activo){
      this.toastr.warning('Aún no se ha activado el cuestionario', 'Warning');
      if (this.usuarioCuestionario=='empresa'){
        this.router.navigate(['cuestionarios/listar-cuestionarios-tutor-empresa']);
      }else{
        this.router.navigate(['/']);
      }
    }
    this.respuestasForm.patchValue(res);
    this.cuestionario.preguntas.forEach((element:PreguntaModel) => {
      this.addRespuesta(element.tipo, element.pregunta);
    });
  },
  error => {
    this.toastr.warning('Aún no se ha activado el cuestionario', 'Warning');
      if (this.usuarioCuestionario=='empresa'){
        this.router.navigate(['cuestionarios/listar-cuestionarios-tutor-empresa']);
      }else{
        this.router.navigate(['/']);
      }
  },
  () => {});
  }

  onSubmit() {
    const respuestaCuestionarioModel= new RespuestaCuestionarioModel();
    respuestaCuestionarioModel.setCuestionario(this.respuestasForm.value);

    const storageSub = this.cuestionarioRespondidoService.add(respuestaCuestionarioModel)
    .pipe(first(),catchError((e) => {
      this.toastr.error('El cuestionario no ha podido guardarse', 'Error');
      return throwError(new Error(e));
    }))
    .subscribe((cuestionario: any) => {
      if (cuestionario) {
        var o: any = cuestionario;
        this.toastr.success("Formulario añadido con éxito", 'Añadido');
        if (this.usuarioCuestionario=='empresa'){
          this.router.navigate(['cuestionarios/listar-cuestionarios-tutor-empresa']);
        }else{
          this.router.navigate(['/']);
        }
      } else {
        this.hasError = true;
      }
    })
    this.unsubscribe.push(storageSub);
  }

}

