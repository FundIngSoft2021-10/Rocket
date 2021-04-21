//Importamos clases
const Juegos = require ('./js/Juego');
const Usuarios = require ('./js/Usuario');
const Carritos = require ('./js/Carrito');
const Juego = Juegos.Juego;
const Usuario = Usuarios.Usuario;
const Carrito = Carritos.Carrito;

listaUsuarios = new Array();
listaJuegos = new Array();

var juego1 = new Juego(1, 'Fifa 2021', 86000, 'ea', 'Deportes', 'img/fifa.jpeg');
var juego2 = new Juego(2, 'Among Us', 10000, 'incognito', 'Casual', 'img/among.jpeg');
var juego3 = new Juego(3, 'Minecraft', 105000, 'Microsoft', 'Casual', 'img/minecraft.jpg');
var juego4 = new Juego(4, 'Inside', 50000, 'ea', 'Aventura', 'img/inside.jpg');
listaJuegos.push(juego1);
listaJuegos.push(juego2);
listaJuegos.push(juego3);
listaJuegos.push(juego4);

/* var juego5 = new Juego(5, 'Fifa 2021', 86000, 'ea', 'Deportes', 'img/fifa.jpeg');
var juego6 = new Juego(6, 'Among Us', 10000, 'incognito', 'Casual', 'img/among.jpeg');
var juego7 = new Juego(7, 'Minecraft', 105000, 'Microsoft', 'Casual', 'img/minecraft.jpg');
var juego8 = new Juego(8, 'Inside', 50000, 'ea', 'Aventura', 'img/inside.jpg');
listaJuegos.push(juego5);
listaJuegos.push(juego6);
listaJuegos.push(juego7);
listaJuegos.push(juego8); */

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
app.use('/js', express.static(__dirname + '/js'));
app.use('/videos', express.static(__dirname + '/videos'));

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
                usuarioActivo = req.session.user 
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

//PagoCarrito
/* app.post('/pagoDeCarrito', async (req, res) => {
    res.render('carrito', {
        alert: true,
        alertTitle: "Pago exitoso",
        alertMessage: "¡PAGO REALIZADO!",
        alertIcon: "success",
        showConfirmButton: false,
        timer: 1500,
        ruta: ''
    })
}) */

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
            name: req.session.name,
            listaJuegos: listaJuegos,
            listaJuegosJason: JSON.stringify(listaJuegos)
        });
    } else {
        res.redirect('/')
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