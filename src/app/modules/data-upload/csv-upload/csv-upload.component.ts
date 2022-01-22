import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { first } from 'rxjs/operators';
import { FileUploadModel } from 'src/app/models/file-upload.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

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
  ) {

  }

  ngOnInit(): void {
  }


  filesAlumnos: File[] = [];
  onSelectAlumnos(event: any) {
    this.filesAlumnos.push(...event.addedFiles);
    console.log(this.filesAlumnos)

    for(let i= 0; i<this.filesAlumnos.length;i++){

      const fileAlumno = this.filesAlumnos[i];

      this.readFile(fileAlumno).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileAlumno, fileContents);
        console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveAlumnos(event:any) {
    console.log(event);
    this.filesAlumnos.splice(this.filesAlumnos.indexOf(event), 1);
  }




  filesMaterias: File[] = [];
  onSelectMaterias(event: any) {
    this.filesMaterias.push(...event.addedFiles);
    console.log(this.filesMaterias)

    for(let i= 0; i<this.filesMaterias.length;i++){

      const fileMateria = this.filesMaterias[i];

      this.readFile(fileMateria).then(fileContents => {
        // Put this string in a request body to upload it to an API.
        //console.log(fileContents)
        this.submitFile(fileMateria, fileContents);
        console.log(fileContents);
      })
    }
  }
  // Envío de fichero comprimido a base64
  onRemoveMaterias(event:any) {
    console.log(event);
    this.filesMaterias.splice(this.filesMaterias.indexOf(event), 1);
  }













submitFile(file: File, content: any) {

  const newStorage = new FileUploadModel()
  newStorage.file_name = file.name
  newStorage.file_content = content
  newStorage.content_type = file.type
  const storageSub = this.storageService.add(newStorage)
    .pipe(first())
    .subscribe((storage: FileUploadModel) => {
      if (storage) {
        console.log(storage)
        //this.closeModalEvent.emit('closeModal');
      } else {
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
