import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignaturePad } from 'angular2-signaturepad';
import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { FirmaAnexoModel } from 'src/app/models/firmaAnexo.model';
import { FirmaService } from 'src/app/services/firma-anexo.service';


@Component({
  selector: 'app-modal-firma',
  templateUrl: './modal-firma.component.html',
  styleUrls: ['./modal-firma.component.scss']
})
export class ModalFirmaComponent implements OnInit {

  signatureImg!: string;
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;
  @Input() codigo_anexo: any;

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 450,
    'canvasHeight': 300
  };

  private unsubscribe: Subscription[] = [];
  
  constructor(
    private modalActive: NgbActiveModal,
    private firmaService: FirmaService,
    private toastr: ToastrService,
  ) { }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    // console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    const firma = new FirmaAnexoModel();

    firma.codigo_anexo = this.codigo_anexo;
    firma.contenido = this.signatureImg;

    const storageSub = this.firmaService.add(firma)
    .pipe(first(),catchError((e) => {
      console.log(e);
      this.toastr.error('El anexo no ha podido ser firmado', 'Fallo');
      return throwError(new Error(e));
    }))
    .subscribe((storage: FirmaAnexoModel) => {
      if (storage) {
        var o: any = storage;
        this.toastr.success('Firma añadida', 'Añadida');
        let mensaje: String = o.mensaje.replaceAll('\\r', '\r').replaceAll('\\n', '\n');
        this.closeModal();
      } else {
        // this.hasError = true;
      }
    })
    this.unsubscribe.push(storageSub);

  }

  ngOnInit(): void {
  }


  /**
 * Cierra el modal de firma de anexos
 * @author Pablo
 */
  closeModal() {
    this.modalActive.close();
  }


}
