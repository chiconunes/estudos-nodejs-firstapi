const http = require("http");

const server = http.createServer((request, respose) => {
    respose.writeHead(200, { 'Content-Type': 'application/json' });

    console.log("request.url ",request.url)
    if (request.url === '/produto'){
        respose.end(JSON.stringify({
            message:"Rota de produto",
        }))
    }

    if (request.url === '/usuario'){
        respose.end(JSON.stringify({
            message:"Rota de usuario",
        }))
    }

    console.log("Continuou !!!")
    respose.end(JSON.stringify({
        message:"Qualquer outra Rota",
    }))

}).listen(4001, () => console.log("Servidor rodando na porta 4001"));


