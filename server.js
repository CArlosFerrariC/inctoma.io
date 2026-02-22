const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif'
};

http.createServer((req, res) => {
  // Simplificar la URL para seguridad y manejo de rutas
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Evitar que se acceda a archivos fuera del directorio del proyecto
  if (filePath.indexOf(__dirname) !== 0) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Acceso prohibido');
      return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Recurso no encontrado');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error interno del servidor: ${err.code}`);
      }
    } else {
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}).listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}, accesible desde tu red local.`);
  console.log(`Para verlo en este equipo, abre: http://localhost:${PORT}`);
});
