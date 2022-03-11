//const { response } = require("express");
const express = require("express");
const{randomUUID}= require("crypto");
const fs = require("fs");
const { json } = require("express/lib/response");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json","utf-8",(err,data) => {
    if (err){
        console.log(err);
    }else{
        products = JSON.parse(data);
    } 
});

//-- vamos adicionar novo conteudo
function ProductFile(){
    fs.writeFile("products.json",JSON.stringify(products),(err) => {
        if (err){
            console.log(err);
        }else{
            console.log("Produto inserido");
        }
    });
};


app.post("/products",(request,response) => {
    // Nome e preço
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id : randomUUID(),
    };

    products.push(product);

    // vamos gravar en arquivo    
    ProductFile();

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

app.put("/products/:id",(request,response) => {
    // Nome e preço
    const { id}  = request.params;
    const { name, price } = request.body;
    
    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        id:products[productIndex].id,////...products[productIndex],
        name,
        price
    }

     // vamos gravar en arquivo    
     ProductFile();

    return response.json({message:"Produto alterado com sucesso"});
});

app.delete("/products/:id",(request,response) => {
    // Nome e preço
    const { id}  = request.params;
    const { name, price } = request.body;
    
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex,1);

    // vamos gravar en arquivo    
    ProductFile();

    return response.json({message:"Produto removido com sucesso"});
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));