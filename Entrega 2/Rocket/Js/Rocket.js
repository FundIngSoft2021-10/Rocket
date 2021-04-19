import "Usuarios.js"
class Rocket{
    constructor (){
        var listaUsuarios = new Array();
       // var controladorTrans = new ControladorTransaccion();
    }
    crearUsuario(){
        var Aux = new Usuario("Julian","Gonorreas","jr.rizo","aguacate00", 1 ,"soypobre1230", "jr.rizo.o.jr@gmail.com");
        listaUsuarios.push(Aux);
        alert("se ha creado");
    }
    get getUsuarios(){
        return this.listaUsuarios;
    }
     saludar()
     {
         alert("malparidos todos en especial nicolas");
     }   
    
}

rocket = new Rocket();
rocket.crearUsuario();
