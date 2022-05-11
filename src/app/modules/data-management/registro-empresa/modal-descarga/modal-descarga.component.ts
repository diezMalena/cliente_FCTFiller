import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroEmpresaService } from '../../../../services/registro-empresa.service';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-descarga',
  templateUrl: './modal-descarga.component.html',
  styleUrls: ['./modal-descarga.component.scss'],
})
export class ModalDescargaComponent implements OnInit {
  public ruta_anexo: string = '';

  constructor(
    private modalActive: NgbActiveModal,
    private registroEmpresaService: RegistroEmpresaService,
    private router: Router
  ) {
    //Recojo la ruta del anexo de la pagina del resumen:
    this.registroEmpresaService.descargarTrigger.subscribe({
      next: (data: Array<any>) => {
        this.ruta_anexo = data[0];
      },
    });
  }

  ngOnInit(): void {}

  closeModel() {
    this.modalActive.dismiss();
  }

  /**
   * @author Malena
   */
  descargarDocumento() {
    this.registroEmpresaService.descargarAnexo0(this.ruta_anexo).subscribe({
      next: (response: any) => {
        let arr = this.ruta_anexo.split('\\', 3);
        let nombre = arr.pop();
        const blob = new Blob([response], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, nombre);
        //Hacer un split de la ruta, y hacer un pop para coger el ultimo elemento.
      },
      error: (e) => {},
    });
    this.closeModel();
    this.router.navigateByUrl('');
  }

  /**
   * @author Malena
   */
  goHomePage() {
    this.closeModel();
    this.router.navigateByUrl('');
  }
}
