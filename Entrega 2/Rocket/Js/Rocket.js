
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
         alert("ing.soft nos va a vomitar en la cara");
     }   
    
}

rocket = new Rocket();




