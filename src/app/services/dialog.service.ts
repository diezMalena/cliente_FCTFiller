import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  async confirmacion(title: string, message: string) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {title, message},
      width: '400px',
    }).afterClosed().subscribe(res => {
      return res.respuesta
    });
  }
}
