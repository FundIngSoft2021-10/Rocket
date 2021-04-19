
var contador = 0;

class Transaccion {
    constructor(total) {
        this.idTransaccion = contador++;
        this.estado = "No Aprobada";
        this.total = total;
    }
    get getIdTransaccion() {
        return this.idTransaccion;
    }

    set setIdTransaccion(idTransaccion) {
        this.idTransaccion = idTransaccion;
    }

    get getEstado() {
        return this.estado;
    }

    set setEstado(estado) {
        this.estado = estado;
    }

    get getTotal() {
        return this.total;
    }

    set setTotal(total) {
        this.total = total;
    }
    
    pagar() {

    }
    confirmar() {

    }
}


