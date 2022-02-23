import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';

@Component({
  selector: 'app-modal-profesores',
  templateUrl: './modal-profesores.component.html',
  styleUrls: ['./modal-profesores.component.scss']
})
export class ModalProfesoresComponent implements OnInit {

  public profesores: any =[];
  public profesor: any = [];
  public numero : any;

  constructor(
    private modalActive: NgbActiveModal,
    private profesorService: CrudProfesoresService
  ) {
    this.numero=  sessionStorage.getItem("numPeticion");
  }

  ngOnInit(): void {
    if (this.numero=='0'){
      this.verProfesor();
    }
  }

  public verProfesor(){
    const dni_profesor: any= sessionStorage.getItem("dniProfesor");
    this.profesorService.getProfesor(dni_profesor).subscribe((response)=>{
      this.profesor=response;
      console.log(response);
    })
  }

  public registrarProfesor(){

  }

  CloseModal(){
    this.modalActive.dismiss();
  }
}
