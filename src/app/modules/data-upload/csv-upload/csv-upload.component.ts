import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { catchError, first } from 'rxjs/operators';
import { FileUploadModel } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { ManualCSVUploadComponent } from '../../manuales/manual-csv-upload/manual-csv-upload.component';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  hasError!: boolean;
  private unsubscribe: Subscription[] = [];


  constructor(
    private storageService: FileUploadService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  abrirAyuda() {
    this.modalService.open(ManualCSVUploadComponent, {size: 'lg'});
  }

  //filesAlumnos CSV-----------------------------------------------------
  filesAlumnos: File[] = [];
  /**
   *  @author Pablo
   * Controla si existe un fichero para ser añadido
   * Si existe ya un fichero no puede agregarse un segundo
   */
  onSelectAlumnos(event: any) {
    if (this.filesAlumnos.length == 0) {
      this.filesAlumnos.push(...event.addedFiles);
    }
  }
  onRemoveAlumnos(event: any) {
    console.log(event);
    this.filesAlumnos.splice(this.filesAlumnos.indexOf(event), 1);
  }

  //filesMaterias CSV-----------------------------------------------------
  filesMaterias: File[] = [];
  onSelectMaterias(event: any) {
    if (this.filesMaterias.length == 0) {
      this.filesMaterias.push(...event.addedFiles);
    }
  }
  onRemoveMaterias(event: any) {
    console.log(event);
    this.filesMaterias.splice(this.filesMaterias.indexOf(event), 1);
  }

  //filesMatriculas CSV-----------------------------------------------------
  filesMatriculas: File[] = [];
  onSelectMatriculas(event: any) {
    if (this.filesMatriculas.length == 0) {
      this.filesMatriculas.push(...event.addedFiles);
    }
  }
  onRemoveMatriculas(event: any) {
    console.log(event);
    this.filesMatriculas.splice(this.filesMatriculas.indexOf(event), 1);
  }

  //filesNotas CSV-----------------------------------------------------
  filesNotas: File[] = [];
  onSelectNotas(event: any) {
    if (this.filesNotas.length == 0) {
      this.filesNotas.push(...event.addedFiles);
    }
  }
  onRemoveNotas(event: any) {
    console.log(event);
    this.filesNotas.splice(this.filesNotas.indexOf(event), 1);
  }

  //filesUnidades CSV-----------------------------------------------------
  filesUnidades: File[] = [];
  onSelectUnidades(event: any) {
    if (this.filesUnidades.length == 0) {
      this.filesUnidades.push(...event.addedFiles);
    }
  }
  onRemoveUnidades(event: any) {
    console.log(event);
    this.filesUnidades.splice(this.filesUnidades.indexOf(event), 1);
  }

  //filesProfesores CSV-----------------------------------------------------
  filesProfesores: File[] = [];
  onSelectProfesores(event: any) {
    if (this.filesProfesores.length == 0) {
      this.filesProfesores.push(...event.addedFiles);
    }
  }
  onRemoveProfesores(event: any) {
    console.log(event);
    this.filesProfesores.splice(this.filesProfesores.indexOf(event), 1);
  }

  /**
   *  @author Pablo
   * Comprueba si existe un fichero, lo formatea y lo añade a la lista común que será enviada al servidor
   */
  async subirFicheros() {
    let filesUploadList = [];
    if (this.filesAlumnos.length > 0) {
      let file = await this.readFile(this.filesAlumnos[0]).then(fileContents => {
        return this.createFileUpload(this.filesAlumnos[0], fileContents, environment.alumnos);
      });
      filesUploadList.push(file);
    }
    if (this.filesMaterias.length > 0) {
      let file = await this.readFile(this.filesMaterias[0]).then(fileContents => {
        return this.createFileUpload(this.filesMaterias[0], fileContents, environment.materias);
      });
      filesUploadList.push(file);
    }
    if (this.filesMatriculas.length > 0) {
      let file = await this.readFile(this.filesMatriculas[0]).then(fileContents => {
        return this.createFileUpload(this.filesMatriculas[0], fileContents, environment.matriculas);
      });
      filesUploadList.push(file);
    }
    if (this.filesNotas.length > 0) {
      let file = await this.readFile(this.filesNotas[0]).then(fileContents => {
        return this.createFileUpload(this.filesNotas[0], fileContents, environment.notas);
      });
      filesUploadList.push(file);
    }
    if (this.filesUnidades.length > 0) {
      let file = await this.readFile(this.filesUnidades[0]).then(fileContents => {
        return this.createFileUpload(this.filesUnidades[0], fileContents, environment.unidades);
      });
      filesUploadList.push(file);
    }
    if (this.filesProfesores.length > 0) {
      let file = await this.readFile(this.filesProfesores[0]).then(fileContents => {
        return this.createFileUpload(this.filesProfesores[0], fileContents, environment.profesores);
      });
      filesUploadList.push(file);
    }

    // console.log(filesUploadList);

    if (filesUploadList.length > 0) {
      const storageSub = this.storageService.add(filesUploadList)
        .pipe(first(), catchError((e) => {
          console.log(e);
          const modalRef = this.modalService.open(ModalInfoComponent);
          modalRef.componentInstance.content = "No se ha podido establecer una conexión con el servidor";
          return throwError(new Error(e));
        }))
        .subscribe((storage: FileUploadModel[]) => {
          // console.log(storage)
          if (storage) {
            //David Sánchez Barragán
            //Cambio para incluir mensaje del servidor
            //Es una ñapa, habría que hacerlo algo mejor
            var o: any = storage;
            let mensaje: String = o.mensaje.replaceAll('\\r', '\r').replaceAll('\\n', '\n');
            const modalRef = this.modalService.open(ModalInfoComponent);
            modalRef.componentInstance.content = mensaje;
            //console.log(mensaje);
            //this.closeModalEvent.emit('closeModal');
          } else {
            // console.log(storage)
            this.hasError = true;
          }
        })
      this.unsubscribe.push(storageSub);
    } else {
      const modalRef = this.modalService.open(ModalInfoComponent);
      modalRef.componentInstance.content = "No se ha seleccionado ningún fichero para subir";
    }
  }

  /**
   *  @author Pablo
   * Crea el modelo del fichero
   */
  createFileUpload(file: File, content: any, box_name: string) {
    const newStorage = new FileUploadModel()
    newStorage.file_name = file.name
    newStorage.file_content = content
    newStorage.content_type = file.type
    newStorage.box_file = box_name
    return newStorage;
  }

   /**
 *  @author Pablo
 * Función propia de la biblioteca del drag and drop que lee el contenido del fichero
 */
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
