import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Factura } from '../../../../models/factura';

@Component({
  selector: 'app-modal',
  templateUrl: 'ModalRetirar.component.html',
  styleUrls: ['./ModalRetirar.component.css']
})

export class ModalRetirarComponent implements OnInit{
  public action: string;
  public local_data: any;
  public codigo: String | any;
  public entrada: String | any;
  public salida: String | any;
  public monto: Number | any;

  constructor(private dialogRef: MatDialogRef<ModalRetirarComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Factura) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.dialogRef.disableClose = true;
  }

ngOnInit(){
  this.codigo = this.local_data.codigo;
  this.monto = this.local_data.amount;
  this.entrada = moment(this.local_data.inn).format('DD-MM-YYYY HH:mm:ss');
  this.salida = moment(this.local_data.out).format('DD-MM-YYYY HH:mm:ss');
  this.monto = new Intl.NumberFormat('en-US', 
    { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
      minimumSignificantDigits: 1,
      maximumSignificantDigits: 2 }).format(this.local_data.amount);
}

  cerrarDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}