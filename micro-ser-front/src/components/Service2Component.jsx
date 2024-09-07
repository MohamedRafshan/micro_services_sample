import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Service1Component = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get('/service2'); // Proxy will route this to the gateway
        setMessage(res.data);
      } catch (err) {
        setMessage('Error fetching data');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h2>Service 2 Response</h2>
      <p>{message}</p>
    </div>
  );
};

export default Service1Component;
