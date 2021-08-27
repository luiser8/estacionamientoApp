import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comprobante } from 'src/app/models/comprobante';

@Component({
  selector: 'app-modal',
  templateUrl: 'ModalComprobante.component.html',
  styleUrls: ['./ModalComprobante.component.css']
})

export class ModalComprobanteComponent implements OnInit{
  public action: string;
  public local_data: any;
  public codigo: String | any;
  public dias: Number | any;
  public pagado: Number | any;

  constructor(private dialogRef: MatDialogRef<ModalComprobanteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Comprobante) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.dialogRef.disableClose = true;
  }

ngOnInit(){
  this.codigo = this.local_data.codigo;
  this.dias = this.local_data.dias;
  this.codigo = this.local_data.codigo;
  this.pagado = new Intl.NumberFormat('en-US', 
    { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 2 }).format(this.local_data.pagado);
}

  cerrarDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}