// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/service1': 'http://localhost:4000',  // Assuming gateway is at port 4000
      '/service2': 'http://localhost:4000',  // Assuming gateway is at port 4000
    },
  },
});
