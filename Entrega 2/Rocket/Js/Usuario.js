

class Usuario {
    constructor(nombre, apellido, nomUsuario, contrasena, Id, usuarioPay, email){
        this.nombre=nombre;
        this.apellido=apellido;
        this.nomUsuario=nomUsuario;
        this.contrasena=contrasena;
        this.Id=Id;
        this.usuarioPay=usuarioPay;
        this.email=email;
        var listaTransaccion = new Array();
    }
    
    realizarTransaccion(total){
        transaccion = new Transaccion(total);
        this.listaTransaccion.push(transaccion);
    }
}