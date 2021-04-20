const Juego = require ('./js/Juego');
const Usuario = require ('./js/Usuario');
const Carrito = require ('./js/Carrito');


listaJuegos = new Array();
baseDeDatos = [
    {
        id: 1,
        nombre: 'Fifa 2021',
        precio: 86000,
        imagen: 'img/fifa.jpeg'
    },
    {
        id: 2,
        nombre: 'Among Us',
        precio: 10000,
        imagen: 'img/among.jpeg'
    },
    {
        id: 3,
        nombre: 'Minecraft',
        precio: 105000,
        imagen: 'img/minecraft.jpg'
    },
    {
        id: 4,
        nombre: 'Inside',
        precio: 50000,
        imagen: 'img/inside.jpg'
    }

];
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
app.use(express.static(__dirname + '/js'));

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