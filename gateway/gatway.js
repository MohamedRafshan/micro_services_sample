// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();

// // Get microservice URLs from environment variables or use default values
// const SERVICE_1_URL = process.env.SERVICE_1_URL || 'http://localhost:3000';
// const SERVICE_2_URL = process.env.SERVICE_2_URL || 'http://localhost:8080';

// // Route for Microservice 1
// app.use('/service1', createProxyMiddleware({
//   target: SERVICE_1_URL,
//   changeOrigin: true
// }));

// // Route for Microservice 2
// app.use('/service2', createProxyMiddleware({
//   target: SERVICE_2_URL,
//   changeOrigin: true
// }));

// // Default Gateway Route
// app.get('/', (req, res) => {
//   res.send('API Gateway is working');
// });

// // Set dynamic port for the API Gateway (default to 3000 if not specified)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`API Gateway listening on port http://localhost:${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const Consul = require('consul');  // Use Consul constructor properly
const consul = new Consul();       // Instantiate Consul correctly

const app = express();
const PORT = process.env.PORT || 4000;

// Function to dynamically discover services from Consul
const discoverService = async (serviceName) => {
  try {
    const services = await new Promise((resolve, reject) => {
      consul.agent.service.list((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    const serviceInstances = Object.values(services).filter(
      (service) => service.Service === serviceName
    );
    
    if (serviceInstances.length > 0) {
      const instance = serviceInstances[Math.floor(Math.random() * serviceInstances.length)];
      return `http://${instance.Address}:${instance.Port}`;
    } else {
      throw new Error(`Service ${serviceName} not found`);
    }
  } catch (err) {
    console.error(`Error discovering service ${serviceName}:`, err.message);
    throw err;
  }
};

// Middleware to dynamically proxy requests to a specific service
const dynamicProxy = (serviceName) => {
  return async (req, res, next) => {
    try {
      const targetServiceUrl = await discoverService(serviceName);
      console.log(`Routing to ${serviceName}: ${targetServiceUrl}`);
      createProxyMiddleware({
        target: targetServiceUrl,
        changeOrigin: true,
        logLevel: 'debug', // To track the routing process
      })(req, res, next);
    } catch (error) {
      res.status(502).send(`Could not route to ${serviceName}: ${error.message}`);
    }
  };
};

// Route to Microservice 1
app.use('/service1', dynamicProxy('service1'));

// Route to Microservice 2
app.use('/service2', dynamicProxy('service2'));

// Root route for health check
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

// Start the gateway
app.listen(PORT, () => {
  console.log(`API Gateway is running on port on http://localhost:${PORT}`);
});

