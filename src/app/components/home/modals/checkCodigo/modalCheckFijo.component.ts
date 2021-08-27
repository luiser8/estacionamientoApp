import { Component, Inject, OnInit, Optional, EventEmitter  } from '@angular/core';
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
  public onSave = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<ModalCheckFijoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Comprobante) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.dialogRef.disableClose = true;
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
      this.onSave.emit({ event: this.action, data: this.local_data });
    }
  }
}