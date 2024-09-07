const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Get microservice URLs from environment variables or use default values
const SERVICE_1_URL = process.env.SERVICE_1_URL || 'http://localhost:3000';
const SERVICE_2_URL = process.env.SERVICE_2_URL || 'http://localhost:8080';

// Route for Microservice 1
app.use('/service1', createProxyMiddleware({
  target: SERVICE_1_URL,
  changeOrigin: true
}));

// Route for Microservice 2
app.use('/service2', createProxyMiddleware({
  target: SERVICE_2_URL,
  changeOrigin: true
}));

// Default Gateway Route
app.get('/', (req, res) => {
  res.send('API Gateway is working');
});

// Set dynamic port for the API Gateway (default to 3000 if not specified)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port http://localhost:${PORT}`);
});
