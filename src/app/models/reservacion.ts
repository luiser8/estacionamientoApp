export interface Reservacion {
    _id?: String;
    usuarioId: String;
    puestoId: String;
    tipo: Number;
    estado?: Boolean;
    createdAt?: Date;
}