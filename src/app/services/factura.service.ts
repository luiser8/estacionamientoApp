import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EndpointService } from './endpoint.service';
import { Factura } from 'src/app/models/factura';
import { ModalRetirarComponent } from '../components/home/modals/retirar/modalRetirar.component';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
public factura: any = [];
  constructor(private endpoint : EndpointService, private readonly dialog: MatDialog) {}

  public Generar(factura:Factura) {
    return this.endpoint.Post('facturas', factura).subscribe((res:any) => {
        this.factura = res;
        const dialogRef = this.dialog.open(ModalRetirarComponent, {
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
}