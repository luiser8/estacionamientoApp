import { Injectable } from '@angular/core';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
public factura: any = [];
  constructor(private endpoint : EndpointService) {}

  public SetReservacion(id: String, tipo : Number) {
    return this.endpoint.Put('reservacion', id, {'tipo': tipo}).subscribe((res:any) => {
      }, error => {
        console.log(error);
      });
  }
  public DelReservacion(id: String) {
    this.endpoint.Delete('reservacion', id).subscribe((res:any) => {
      }, error => {
        console.log(error);
      });
  }
}