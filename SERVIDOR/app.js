const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const jwt = require ('jsonwebtoken');
const SECRET_KEY = "clavesecreta"
app.use(bodyParser.json());

app.use(cors());
app.use(cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

let cats = require('./API/cats/cat.json');
let buy = require('./API/cart/buy.json');
let publish = require('./API/sell/publish.json');
let catsProducts = './API/cats_products';
let products = './API/products';
let productsComments = './API/products_comments';
let userCart = './API/user_cart';



app.get("/", (req, res) => {
    res.send("Servidor Grupo 255 - 2023")
})

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto:", "3000")
})

app.get("/cats", (req, res) => {
    res.json(cats)
})

app.get("/buy", (req, res) => {
    res.json(buy)
})

// app.get('/publish.json', (req, res) => {
//     res.json(publish)
// })

app.get("/cats_products/:id", (req, res) => {
    let productsId = req.params.id
    const rutaArchivos = `${catsProducts}/${productsId}`;

    const productData = require(rutaArchivos);
    res.json(productData);
})

app.get("/products/:id", (req, res) => {
    let productsId = req.params.id
    const rutaArchivos = `${products}/${productsId}`;

    const productData = require(rutaArchivos);
    res.json(productData);
})

app.get("/products_comments/:id", (req, res) => {
    let productsId = req.params.id
    const rutaArchivos = `${productsComments}/${productsId}`;

    const productData = require(rutaArchivos);
    res.json(productData);
})

app.get("/user_cart/:id", (req, res) => {
    let productsId = req.params.id
    const rutaArchivos = `${userCart}/${productsId}`;

    const productData = require(rutaArchivos);
    res.json(productData);

})

app.get("/login", (req, res) =>{
    res.json(arrayUsers)
})



const fs = require('fs');

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Lee el archivo users.json
    fs.readFile('./SERVIDOR/API/registros/users.json', 'utf8', (err, data) => {
        let arrayUsers;

        if (err) {
            console.error("Error al leer el archivo JSON:", err);
            res.status(500).json({ error: 'Error al autenticar al usuario' });
            return;
        }

        try {
            // Intenta parsear el contenido del archivo
            arrayUsers = JSON.parse(data);
        } catch (jsonError) {
            // Si hay un error al analizar el JSON, devuelve un error
            console.error("Error al analizar el JSON:", jsonError);
            res.status(500).json({ error: 'Error al autenticar al usuario' });
            return;
        }

        // Busca el usuario en arrayUsers
        const user = arrayUsers.find(u => u.username === username && u.password === password);

        if (user) {
            // Usuario autenticado, genera un token
            const token = jwt.sign({ username }, SECRET_KEY);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: "Usuario y/o contraseña incorrectos" });
        }
    });
});

app.use('/cart', (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded);
        next();
    } catch (error) {
        res.status(401).json({ message: "No autorizado" });
    }
});


// BD
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: "localhost", user: "root", password: "1947", database:"entrega8", connectionLimit: 10});


app.post('/cart', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const cartItems = req.body.cosasenelcart;         
        for (const item of cartItems) {
            await connection.query('INSERT INTO carrito (id, name, unitCost, currency, image, count) VALUES (?, ?, ?, ?, ?, ?)', [item.id, item.name, item.unitCost, item.currency, item.image, item.count]);
        }

        connection.release();
        res.status(200).json({ message: 'Carrito actualizado con éxito en la base de datos' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el carrito en la base de datos' });
    }
});





app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Lee el archivo users.json
    fs.readFile('./SERVIDOR/API/registros/users.json', 'utf8', (err, data) => {
        let arrayUsers;

        if (err) {
            console.error("Error al leer el archivo JSON:", err);
            res.status(500).json({ error: 'Error al registrar el usuario' });
            return;
        }

        try {
            // Intenta parsear el contenido del archivo
            arrayUsers = JSON.parse(data);
        } catch (jsonError) {
            // Si hay un error al analizar el JSON, inicializa arrayUsers como un array vacío
            console.error("Error al analizar el JSON:", jsonError);
            arrayUsers = [];
        }

        // Verificar si el usuario ya existe en arrayUsers
        const existingUser = arrayUsers.find(u => u.username === username);

        if (existingUser) {
            // Si el usuario ya existe, devolver un error
            res.status(409).json({ message: "El usuario ya existe" });
        } else {
            // Si el usuario no existe, agregarlo a arrayUsers
            arrayUsers.push({ username, password });

            // Escribe el nuevo arrayUsers de nuevo al archivo users.json
            fs.writeFile('./SERVIDOR/API/registros/users.json', JSON.stringify(arrayUsers), 'utf8', (writeError) => {
                if (writeError) {
                    console.error("Error al escribir en el archivo JSON:", writeError);
                    res.status(500).json({ error: 'Error al registrar el usuario' });
                    return;
                }

                // Puedes opcionalmente generar un token y devolverlo como respuesta
                const token = jwt.sign({ username }, SECRET_KEY);

                res.status(201).json({ message: "Usuario registrado exitosamente", token });
            });
        }
    });
});