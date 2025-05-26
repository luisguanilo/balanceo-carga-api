const http = require('http');

const PORT = process.env.PORT || 3000;
const CONTAINER_NAME = process.env.CONTAINER_NAME || 'API';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`hola mundo desde ${CONTAINER_NAME}`);
  } else {
    res.writeHead(404);
    res.end('no hay respuesta, no hay');
  }
});

server.listen(PORT, () => {
  console.log(`servidor corriendo desde ${PORT}`);
});