# Use the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your application will run on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
