class Juego {
    constructor(id, nombre, precio, autor, categoria,imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.autor = autor;
        this.categoria = categoria;
        this.imagen = imagen;
    }
};

module.exports = {
    Juego: Juego
};