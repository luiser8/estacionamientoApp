export interface Comprobante {
    _id?: String;
    reservacionId: String;
    puestoId: String;
    codigo?: Number;
    dias: Number;
    pagado?: Number;
    estado?: Boolean;
    createdAt?: Date;
}