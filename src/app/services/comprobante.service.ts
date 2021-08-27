import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EndpointService } from './endpoint.service';
import { Comprobante } from '../models/comprobante';
import { ModalComprobanteComponent } from '../components/home/modals/comprobante/modalComprobante.component';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  constructor(private endpoint : EndpointService, private readonly dialog: MatDialog) {}

  public SetComprobante(comprobante:Comprobante) {
    return this.endpoint.Post('comprobante', comprobante).subscribe((res:any) => {
        const dialogRef = this.dialog.open(ModalComprobanteComponent, {
          width: '300px',
          data:res,
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(result);
        });
      }, error => {
        console.log(error);
      });
  }
  public DelComprobante(id : String) {
    return this.endpoint.Delete('comprobante', id).subscribe((res:any) => {
       
      }, error => {
        console.log(error);
      });
  }
}