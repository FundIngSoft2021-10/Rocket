
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