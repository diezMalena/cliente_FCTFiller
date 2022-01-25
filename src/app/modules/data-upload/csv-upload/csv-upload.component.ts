import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, first } from 'rxjs/operators';
import { FileUploadModel } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from '../modal-info/modal-info.component';


@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  hasError!: boolean;
  private unsubscribe: Subscription[] = [];


  constructor(
    private storageService:FileUploadService,
    private modalService:NgbModal,
  ) {

  }

  ngOnInit(): void {
  }



  //filesAlumnos CSV-----------------------------------------------------
  filesAlumnos: File[] = [];
  onSelectAlumnos(event: any) {
    this.filesAlumnos.push(...event.addedFiles);
    console.log(this.filesAlumnos)

    for(let i= 0; i<this.filesAlumnos.length;i++){

      const fileAlumno = this.filesAlumnos[i];

      this.readFile(fileAlumno).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileAlumno, fileContents, environment.alumnos);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveAlumnos(event:any) {
    console.log(event);
    this.filesAlumnos.splice(this.filesAlumnos.indexOf(event), 1);
  }

  //filesMaterias CSV-----------------------------------------------------
  filesMaterias: File[] = [];
  onSelectMaterias(event: any) {
    this.filesMaterias.push(...event.addedFiles);
    console.log(this.filesMaterias)

    for(let i= 0; i<this.filesMaterias.length;i++){

      const fileMateria = this.filesMaterias[i];

      this.readFile(fileMateria).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileMateria, fileContents, environment.materias);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveMaterias(event:any) {
    console.log(event);
    this.filesMaterias.splice(this.filesMaterias.indexOf(event), 1);
  }

  //filesMatriculas CSV-----------------------------------------------------
  filesMatriculas: File[] = [];
  onSelectMatriculas(event: any) {
    this.filesMatriculas.push(...event.addedFiles);
    console.log(this.filesMatriculas)

    for(let i= 0; i<this.filesMatriculas.length;i++){

      const fileMatricula = this.filesMatriculas[i];

      this.readFile(fileMatricula).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileMatricula, fileContents, environment.matriculas);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveMatriculas(event:any) {
    console.log(event);
    this.filesMatriculas.splice(this.filesMatriculas.indexOf(event), 1);
  }

  //filesNotas CSV-----------------------------------------------------
  filesNotas: File[] = [];
  onSelectNotas(event: any) {
    this.filesNotas.push(...event.addedFiles);
    console.log(this.filesNotas)

    for(let i= 0; i<this.filesNotas.length;i++){

      const fileNota = this.filesNotas[i];

      this.readFile(fileNota).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileNota, fileContents, environment.notas);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveNotas(event:any) {
    console.log(event);
    this.filesNotas.splice(this.filesNotas.indexOf(event), 1);
  }

  //filesUnidades CSV-----------------------------------------------------
  filesUnidades: File[] = [];
  onSelectUnidades(event: any) {
    this.filesMaterias.push(...event.addedFiles);
    console.log(this.filesUnidades)

    for(let i= 0; i<this.filesUnidades.length;i++){

      const fileUnidad = this.filesUnidades[i];

      this.readFile(fileUnidad).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileUnidad, fileContents, environment.unidades);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveUnidades(event:any) {
    console.log(event);
    this.filesUnidades.splice(this.filesUnidades.indexOf(event), 1);
  }

  //filesProfesores CSV-----------------------------------------------------
  filesProfesores: File[] = [];
  onSelectProfesores(event: any) {
    this.filesProfesores.push(...event.addedFiles);
    console.log(this.filesProfesores)

    for(let i= 0; i<this.filesProfesores.length;i++){

      const fileProfesor = this.filesProfesores[i];

      this.readFile(fileProfesor).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileProfesor, fileContents, environment.profesores);
        // console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveProfesores(event:any) {
    console.log(event);
    this.filesProfesores.splice(this.filesProfesores.indexOf(event), 1);
  }



submitFile(file: File, content: any, box_name: string) {

  const newStorage = new FileUploadModel()
  newStorage.file_name = file.name
  newStorage.file_content = content
  newStorage.content_type = file.type
  newStorage.box_file = box_name
  const storageSub = this.storageService.add(newStorage)
    .pipe(first(),catchError((e) => {
      console.log(e);
      const modalRef = this.modalService.open(ModalInfoComponent);
      modalRef.componentInstance.content="ERROR DE CONEXIÓN";
      return throwError(new Error(e));
    }))
    .subscribe((storage: FileUploadModel) => {
      // console.log(storage)
      if (storage) {
        console.log(storage)
        const modalRef = this.modalService.open(ModalInfoComponent);
        modalRef.componentInstance.content="CONEXIÓN EXITOSA";
        //this.closeModalEvent.emit('closeModal');
      } else {
        // console.log(storage)
        this.hasError = true;

      }
    })


  this.unsubscribe.push(storageSub);
}

private async readFile(file: File): Promise<string | ArrayBuffer> {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      // @ts-ignore
      return resolve((e.target as FileReader).result);
    };

    reader.onerror = e => {
      console.error(`FileReader failed on file ${file.name}.`);
      return reject(null);
    };

    if (!file) {
      console.error('No file to read.');
      return reject(null);
    }

    reader.readAsDataURL(file);
  });
}









}
