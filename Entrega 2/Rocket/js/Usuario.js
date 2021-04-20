class Usuario {
    constructor(nombre, nomUsuario, contrasena, rol, email) {
        this.nombre = nombre;
        this.nomUsuario = nomUsuario;
        this.contrasena = contrasena;
        this.rol = rol;
        this.email = email;
        this.carrito = new Carrito();
    }
}

module.exports = {
    Usuario
};