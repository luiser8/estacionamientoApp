import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comprobante } from 'src/app/models/comprobante';

@Component({
  selector: 'app-modal',
  templateUrl: 'ModalCheckFijo.component.html',
  styleUrls: ['./ModalCheckFijo.component.css']
})

export class ModalCheckFijoComponent implements OnInit{
  public action: string;
  public local_data: any;
  public formCheckCodigo : FormGroup | any;

  constructor(private dialogRef: MatDialogRef<ModalCheckFijoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Comprobante) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

ngOnInit(){
  this.formCheckCodigo = new FormGroup({
    codigo: new FormControl('', [Validators.required]),
  }, { updateOn: 'change' });
}

  cerrarDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  salvar() {
    if(this.formCheckCodigo.valid){
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
}