const Juego = require ('./js/Juego')

class Carrito {
    constructor() {
        this.listaCarrito = new Array();
        this.total = 0;
    }

    añadirJuego(juego) {
        this.listaCarrito.push(juego);
    }
    eliminarJuego(juego) {
        var i = listaCarrito.indexOf(juego);
        if (i !== -1) {
            listaCarrito.splice(i, 1);
        }
    }
    vaciaCarrito() {
        for (carrito in listaCarrito) {
            this.eliminarJuego(this.listaCarrito[carrito]);
        }
    }
}

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

listaJuegos = new Array();
listaUsuarios = new Array();

//Invocamos a express
const express = require('express');
const app = express();

//Seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Invocamos a dotenv (variables de entorno)
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });


//Recursos 
app.use('/stylesheets', express.static('stylesheets'));
app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
app.use('/img', express.static('img'));
app.use('/img', express.static(__dirname + 'img'));

//Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

//Invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

//Var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Invocamos al modulo de conexion de la BD
const connection = require('./database/db');

//Estableciendo las rutas
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/registro', (req, res) => {
    res.render('registro');
})
app.use(express.static(__dirname + '/js'));

//Registración 
app.post('/registro', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.pass;
    const rol = req.body.rol;
    const email = req.body.email;
    const nuevoUsuario = new Usuario(name, user, pass, rol, email);
    listaUsuarios.push(nuevoUsuario);
    console.log(listaUsuarios[0]);
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', { user: nuevoUsuario.nomUsuario, name: nuevoUsuario.nombre, rol: nuevoUsuario.rol, pass: passwordHash, email: nuevoUsuario.email }, async (error, results) => {
        if (error) {
            res.render('registro', {
                alert: true,
                alertTitle: "Registration error",
                alertMessage: "No se ha podido registrar!",
                alertIcon: 'error',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
            console.log(error);
        } else {
            res.render('registro', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Successful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
})

//Autenticacion 
app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    if (user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            } else {
                req.session.loggedin = true;
                req.session.name = results[0].name
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡LOGIN CORRECTO!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        })
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "¡Por favor ingrese un usuario y/o password!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
    }
})

//Auth pages
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/tienda', (req, res) => {
    if (req.session.loggedin) {
        res.render('tienda', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('tienda', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/sobreNosotros', (req, res) => {
    if (req.session.loggedin) {
        res.render('sobreNosotros', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('sobreNosotros', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/noticias', (req, res) => {
    if (req.session.loggedin) {
        res.render('noticias', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('noticias', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/donacion', (req, res) => {
    if (req.session.loggedin) {
        res.render('donacion', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('donacion', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/carrito', (req, res) => {
    if (req.session.loggedin) {
        res.render('carrito', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('carrito', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})

//Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})



//Modo escucha puerto 3000
app.listen(3000, (req, res) => {
    console.log('SERVER RUNNING IN http://localhost:3000');
})