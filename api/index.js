const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log(`Petición recibida en puerto ${PORT}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hola desde la API en el puerto ${PORT}\n`);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});