import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-modal',
  templateUrl: 'ModalEstacionar.component.html',
  styleUrls: ['./ModalEstacionar.component.css']
})

export class ModalEstacionarComponent implements OnInit{
  public action: string;
  public local_data: any;
  public formUsrPuestos : FormGroup | any;

  constructor(private dialogRef: MatDialogRef<ModalEstacionarComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.dialogRef.disableClose = true;
  }

ngOnInit(){
  this.formUsrPuestos = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
  }, { updateOn: 'change' });
}

  cerrarDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  salvar() {
    if(this.formUsrPuestos.valid){
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
}