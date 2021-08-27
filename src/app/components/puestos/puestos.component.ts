import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puestos.component.html',
  styleUrls: ['./puestos.component.css']
})
export class PuestosComponent implements OnInit {
  public puestos:  [] | any;
  public usuarioId : String | any;
  public puestoId : String | any;
  public tipoReservacion : Number | any;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['codigo', 'disponibilidad', 'estado', 'opciones'];

  constructor(private endpoint : EndpointService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPuestos();
  }

  openSnackBar(msj:any) {
    this._snackBar.open(msj, 'Ok', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  addPuesto(){
    this.endpoint.Post('puestos', {}).subscribe((res:any) => {
      this.getPuestos();
      this.openSnackBar('Nuevo puesto ha sido creado!');
    }, error => {
      console.log(error);
    });
  }
  delPuesto(id: String){
    this.endpoint.Delete('puestos', id).subscribe((res:any) => {
      this.getPuestos();
      this.openSnackBar('Puesto ha sido quitado!');
    }, error => {
      console.log(error);
    });
  }
  updatePuesto(id: String, estado : Boolean){
    let changeStd : Boolean | any;
    if(estado === true){changeStd = false}
    if(estado === false){changeStd = true}
    this.endpoint.Put('puestos/estado', id, {'estado': changeStd}).subscribe((res:any) => {
      this.getPuestos();
      this.openSnackBar(`Puesto ha sido ${changeStd === true ? 'Activado' : 'Inactivado'}!`);
    }, error => {
      console.log(error);
    });
  }
  getPuestos() {
    this.endpoint.Get('puestos').subscribe(res => {
      this.puestos = res;
    }, error => {
      console.log(error);
    });
  }
}