import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Reservacion } from 'src/app/models/reservacion';
import { Usuario } from 'src/app/models/usuario';
import { EndpointService } from 'src/app/services/endpoint.service';
import { ModalCheckFijoComponent } from './modals/checkCodigo/modalCheckFijo.component';
import { ModalEstacionarComponent } from './modals/estacionar/modalEstacionar.component';
import { ModalFijoComponent } from './modals/fijo/modalFijo.component';
import { FacturaService } from 'src/app/services/factura.service';
import { ComprobanteService } from 'src/app/services/comprobante.service';
import { ReservacionService } from 'src/app/services/reservacion.service';

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
  public intervalSub: Subscription | any;
  public horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private endpoint : EndpointService, private facturaService:FacturaService, private comprobanteService:ComprobanteService, private reservacionService:ReservacionService,private readonly dialog: MatDialog, private _snackBar: MatSnackBar) { 
    this.intervalSub = interval(300000).subscribe((x => {
      this.getPuestos();
    }));
  }

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
      this.checkCodigoFijo(obj, puesto, 3);
    }
  }

  openSnackBar(msj:any) {
    this._snackBar.open(msj, 'Ok', {
      duration: 4000,
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
          if(res[i].estado === false){
            this.checkPuestoBloqueado(res[i]._id, res[i].updatedAt);
          }
        }
      } 
    }, error => {
      console.log(error);
    });
  }
  checkCodigoFijo(obj:any, puestoId: String, tipo:Number){
    let intentos = 0;
    const dialogRef = this.dialog.open(ModalCheckFijoComponent, {
      width: '300px',
      data:obj,
    });
      dialogRef.componentInstance.onSave.subscribe(result => {
        this.endpoint.Get(`comprobante/codigo/${result.data.codigo}/puesto/${puestoId}`).subscribe((res:any) => {
          if(res !== null){
            this.estacionarFijo(puestoId, tipo);
            dialogRef.close();
          }else{
            intentos++; this.openSnackBar(`Código de validación no valido!. Intentos ${intentos}, recuerda al superar 3 intentos el puesto quedara bloqueado por 5 horas`);
            if(intentos === 3){
              this.toggleStatePuesto(puestoId, true);
              this.openSnackBar(`Puesto bloqueado por intentos fallidos de validación de código!. Ahora debes esperar 5 horas hasta volver a intentar.`);
              dialogRef.close();
            }
          }
        }, error => {
          console.log(error);
        });
      });
  }
  checkEsFijo(puestoId: String, tipo:Number){
    this.endpoint.GetId('comprobante/puesto', puestoId).subscribe((res:any) => {
      if(res !== null){
        this.reservacionService.SetReservacion(res.reservacionId, 2);
        this.setPuesto(puestoId, 2);
        this.openSnackBar(`Se ha retirado de su puesto fijo!`);
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
            this.reservacionService.DelReservacion(res.reservacionId);
            this.openSnackBar('Reservación ha sido quitada!');
            this.comprobanteService.DelComprobante(res._id);
          }
      }
    }, error => {
      console.log(error);
    });
  }
  checkPuestoBloqueado(puestoId: String, updatedAt:Date){
    let ahora = moment(Date.now());
    let desactivado = moment(updatedAt);
    let horas = ahora.diff(desactivado, 'hours');
    console.log('Horas para desbloquear -> ' + horas);
      if(horas >= 5){
        this.toggleStatePuesto(puestoId, false);
      }
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
      reservacion.tipo === 2 ? this.comprobanteService.SetComprobante({'reservacionId': res._id, 'puestoId': res.puestoId,'dias': dias}) : null;
      this.getPuestos();
    }, error => {
      console.log(error);
    });
  }

  retirar(puestoId: String, tipo:Number){
    this.endpoint.GetId('reservacion/puesto', puestoId).subscribe((res:any) => {
      if(res){
        this.reservacionService.DelReservacion(res._id);
        this.openSnackBar('Reservación ha sido quitada!');
        this.setPuesto(puestoId, tipo);
        this.facturaService.Generar({'usuarioId': res.usuarioId, 'reservacionId': res.reservacionId, 'inn': res.createdAt, 'out': Date.now()});
      }
    }, error => {
      console.log(error);
    });
  }
  estacionarFijo(puestoId: String, tipo:Number){
    this.endpoint.GetId('reservacion/puesto', puestoId).subscribe((res:any) => {
      if(res){
        this.reservacionService.SetReservacion(res._id, 1);
        this.setPuesto(puestoId, tipo);
        this.openSnackBar(`Se ha estacionado cliente fijo!`);
      }
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
  toggleStatePuesto(id: String, estado : Boolean){
    let changeStd : Boolean | any;
    if(estado === true){changeStd = false}
    if(estado === false){changeStd = true}
    this.endpoint.Put('puestos/estado', id, {'estado': changeStd}).subscribe((res:any) => {
      this.getPuestos();
    }, error => {
      console.log(error);
    });
  }
}