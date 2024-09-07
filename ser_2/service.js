// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World service 2');
// });


// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



//dynamic

const express = require('express');
const Consul = require('consul'); // Correctly import Consul
const app = express();

const SERVICE_NAME = 'service2';
const SERVICE_ID = 'service1-instance2';
const PORT = 8080;

const consul = new Consul(); // Instantiate Consul correctly

// Service Registration
consul.agent.service.register({
  id: SERVICE_ID,
  name: SERVICE_NAME,
  address: 'localhost',
  port: PORT
}, (err) => {
  if (err) throw err;
  console.log(`${SERVICE_NAME} registered with Consul at localhost:${PORT}`);
});

// Service Routes
app.get('/', (req, res) => {
  res.send('Hello from Service 2');
});

// Deregister service when the process stops
process.on('SIGINT', () => {
  consul.agent.service.deregister(SERVICE_ID, (err) => {
    if (err) throw err;
    console.log(`${SERVICE_NAME} deregistered from Consul`);
    process.exit();
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
