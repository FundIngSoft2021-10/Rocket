class Juego {
    constructor(id, nombre, precio, autor, categoria, imagen, promocion, destacado, proximamente, recomendado) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.autor = autor;
        this.categoria = categoria;
        this.imagen = imagen;
        this.promocion = promocion;
        this.destacado = destacado;
        this.proximamente = proximamente;
        this.recomendado = recomendado;
    }
};

module.exports = {
    Juego: Juego
};