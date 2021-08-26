export interface Factura {
    _id?: String;
    usuarioId: String;
    reservacionId: String;
    codigo?: Number;
    amount?: Number;
    inn: Number;
    out: Number;
    estado?: Boolean;
    createdAt?: Date;
}