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
class Rocket {
    constructor (){
        this.listaUsuarios = new Array();
        // var listaUsuarios = new Array();
        // var controladorTrans = new ControladorTransaccion();
    }

    crearUsuario(){
        var Aux = new Usuario("Julian","Gonorreas","jr.rizo","aguacate00", 1 ,"soypobre1230", "jr.rizo.o.jr@gmail.com");
        rocket.listaUsuarios.push(Aux);
        alert("se ha creado");
        
    }

    get getUsuarios(){
        return this.listaUsuarios;
    }
    
}

rocket = new Rocket();
rocket.crearUsuario();
console.log(rocket.listaUsuarios[0].nombre);