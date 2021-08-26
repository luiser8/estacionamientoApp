import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Puesto } from '../../../../models/puestos';
import { Usuario } from '../../../../models/usuario';

@Component({
  selector: 'app-modal',
  templateUrl: 'ModalFijo.component.html',
  styleUrls: ['./ModalFijo.component.css']
})

export class ModalFijoComponent implements OnInit{
  public action: string;
  public local_data: any;
  public formUsrPuestos : FormGroup | any;

  constructor(private dialogRef: MatDialogRef<ModalFijoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

ngOnInit(){
  this.formUsrPuestos = new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
    dias: new FormControl('', [Validators.required, Validators.min(12), Validators.max(79), Validators.pattern(/^[0-9]+$/)]),
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