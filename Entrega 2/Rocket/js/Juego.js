class Juego {
    constructor(id, nombre, precio, autor, categoria, imagen, promocion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.autor = autor;
        this.categoria = categoria;
        this.imagen = imagen;
        this.promocion = promocion;
    }
};

module.exports = {
    Juego: Juego
};