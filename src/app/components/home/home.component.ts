import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Comprobante } from 'src/app/models/comprobante';
import { Factura } from 'src/app/models/factura';
import { Reservacion } from 'src/app/models/reservacion';
import { Usuario } from 'src/app/models/usuario';
import { EndpointService } from 'src/app/services/endpoint.service';
import { ModalCheckFijoComponent } from './modals/checkCodigo/modalCheckFijo.component';
import { ModalComprobanteComponent } from './modals/comprobante/modalComprobante.component';
import { ModalEstacionarComponent } from './modals/estacionar/modalEstacionar.component';
import { ModalFijoComponent } from './modals/fijo/modalFijo.component';
import { ModalRetirarComponent } from './modals/retirar/modalRetirar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public puestos: any = [];
  public factura: any = [];
  public usuarioId : String | any;
  public comprobanteCod : String | any;
  public puestoId : String | any;
  public tipoReservacion : Number | any;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private endpoint : EndpointService, private readonly dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPuestos();
  }

  abrirModal(action:any, obj:any, puesto:String, tipo : Number){
    this.puestoId = puesto;
    this.tipoReservacion = tipo;
    obj.action = action;

    if(tipo === 1){
      const dialogRef = this.dialog.open(ModalEstacionarComponent, {
        width: '300px',
        data:obj,
      });
      
      dialogRef.afterClosed().subscribe(result => {
        result.data != undefined ? this.agregarUsrEstacionar(result.data, 3) : null;
      });
    }if(tipo === 2){
      const dialogRef = this.dialog.open(ModalFijoComponent, {
        width: '300px',
        data:obj,
      });
      
      dialogRef.afterClosed().subscribe(result => {
        result.data != undefined ? this.agregarUsrEstacionar(result.data, 2) : null;
      });
    }if(tipo === 3){
      this.checkEsFijo(puesto, 1);
    }if(tipo === 4){
      const dialogRef = this.dialog.open(ModalCheckFijoComponent, {
        width: '300px',
        data:obj,
      });
      
      dialogRef.afterClosed().subscribe(result => {
        result.data != undefined ? this.checkCodigoFijo(result.data.codigo, puesto, 3) : null;
      });
    }
  }

  openSnackBar(msj:any) {
    this._snackBar.open(msj, 'Ok', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  getPuestos() {
    this.endpoint.Get('puestos').subscribe((res:any) => {
      this.puestos = res;
      for(let i=0; i < res.length; i++){
        if(res[i].disponibilidad === 2){
          this.checkVencidos(res[i]._id);
        }
      } 
    }, error => {
      console.log(error);
    });
  }
  checkCodigoFijo(codigo:String, puestoId: String, tipo:Number){
    this.endpoint.GetId('comprobante/codigo', codigo).subscribe((res:any) => {
      if(res !== null){
        this.estacionarFijo(puestoId, 3);
      }else{
        this.openSnackBar(`Código de validación no valido!`);
      }
    }, error => {
      console.log(error);
    });
  }
  checkEsFijo(puestoId: String, tipo:Number){
    this.endpoint.GetId('comprobante/puesto', puestoId).subscribe((res:any) => {
      if(res !== null){
        this.setPuesto(puestoId, 2);
        this.setReservacion(res.reservacionId, 2);
      }else{
        this.retirar(puestoId, tipo);
      }
    }, error => {
      console.log(error);
    });
  }
  checkVencidos(puestoId: String){
    this.endpoint.GetId('comprobante/puesto', puestoId).subscribe((res:any) => {
      if(res){
        let dia = res.dias;
        let ahora = moment(Date.now());
        let entrada = moment(res.createdAt);
        let horas = ahora.diff(entrada, 'hours');
          if(horas > dia){
            this.setPuesto(puestoId, 1);
            this.delReservacion(res.reservacionId);
            this.delComprobante(res._id);
          }
      }
    }, error => {
      console.log(error);
    });
  }
  agregarUsrEstacionar(usuario:Usuario | any, tipo : Number){
    let msj = tipo === 3 ? 'Reservación' : 'Alquiler';
    this.endpoint.Post('usuarios', usuario).subscribe((res:any) => {
      this.puestos = res;
      this.usuarioId = res._id;
      if(res){
        this.agregarReservacion({'tipo': this.tipoReservacion, 'usuarioId': res._id, 'puestoId': this.puestoId}, usuario.dias);
        this.setPuesto(this.puestoId, tipo);
        this.openSnackBar(`${msj} ha sido creada!`);
      }
    }, error => {
      console.log(error);
    });
  }
  agregarReservacion(reservacion:Reservacion, dias : Number | any){
    this.endpoint.Post('reservacion', reservacion).subscribe((res:any) => {
      reservacion.tipo === 2 ? this.setComprobante({'reservacionId': res._id, 'puestoId': res.puestoId,'dias': dias}) : null;
    }, error => {
      console.log(error);
    });
  }

  retirar(puestoId: String, tipo:Number){
    this.endpoint.GetId('reservacion/puesto', puestoId).subscribe((res:any) => {
      if(res){
        this.delReservacion(res._id);
        this.setPuesto(puestoId, tipo);
        this.generarFactura({'usuarioId': res.usuarioId, 'reservacionId': res.reservacionId, 'inn': res.createdAt, 'out': Date.now()});
      }
    }, error => {
      console.log(error);
    });
  }
  estacionarFijo(puestoId: String, tipo:Number){
    this.endpoint.GetId('reservacion/puesto', puestoId).subscribe((res:any) => {
      if(res){
        this.setPuesto(puestoId, tipo);
        this.setReservacion(res._id, 1);
        this.openSnackBar(`Se ha estacionado cliente fijo!`);
      }
    }, error => {
      console.log(error);
    });
  }
  setComprobante(comprobante:Comprobante){
    this.endpoint.Post('comprobante', comprobante).subscribe((res:any) => {
      this.comprobanteCod = res.codigo;
      this.getPuestos();
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
  setPuesto(id: String, disponibilidad : Number, estado? : Boolean){
    this.endpoint.Put('puestos', id, {'disponibilidad': disponibilidad, 'estado': estado ? false : true}).subscribe((res:any) => {
      this.getPuestos();
    }, error => {
      console.log(error);
    });
  }
  setReservacion(id: String, tipo : Number){
    this.endpoint.Put('reservacion', id, {'tipo': tipo}).subscribe((res:any) => {
      this.getPuestos();
    }, error => {
      console.log(error);
    });
  }
  delReservacion(id: String){
    this.endpoint.Delete('reservacion', id).subscribe((res:any) => {
      this.getPuestos();
      this.openSnackBar('Reservación ha sido quitada!');
    }, error => {
      console.log(error);
    });
  }
  delComprobante(id: String){
    this.endpoint.Delete('comprobante', id).subscribe((res:any) => {
      this.getPuestos();
    }, error => {
      console.log(error);
    });
  }
  generarFactura(factura:Factura){
    this.endpoint.Post('facturas', factura).subscribe((res:any) => {
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
