// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Static roting

//dynamic routing below


const express = require('express');
const Consul = require('consul'); // Correctly import Consul
const app = express();

const SERVICE_NAME = 'service1';
const SERVICE_ID = 'service1-instance1';
const PORT = 3001;

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
  res.send('Hello from Service 1');
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
