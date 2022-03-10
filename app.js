//const { response } = require("express");
const express = require("express");
const{randomUUID}= require("crypto");

const app = express();

app.use(express.json());

const products = [];

app.post("/products",(request,response) => {
    // Nome e preço
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id : randomUUID(),
    };

    products.push(product);
    console.log(products);
    return response.json(product);
});

app.get("/products",(request,response) => {
    // Nome e preço
    const { name, price } = request.body;
 
    console.log(products);
    return response.json(products);
});

app.get("/products/:id",(request,response) => {
    // Nome e preço
    const { id}  = request.params;
    const product = products.find(product => product.id === id);
    console.log(product);
    return response.json(product);
});


app.get("/primeira-rota", (request, response) => {
    return response.send("Acessou a primeira rota com nodemon");
    return response.json({
        message: "Acessou a primeira rota",
    });
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));