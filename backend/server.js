// backend/server.js
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Allow the React app to call this API from a different port
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Check if the URL is '/api/info' and the method is GET
  if (req.url === '/api/info' && req.method === 'GET') {
    // Set the response headers with status 200 and content type JSON
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // Send back the JSON response
    res.end(JSON.stringify({ info: 'React is communicating with Node.js' }));
  } else {
    // If the route is not found, return 404
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Make the server listen on port 5000
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
