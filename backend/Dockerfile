FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production

# Copy the rest of the backend code
COPY . /app

# Expose a port for the backend
EXPOSE 3000

# Start the backend server
CMD ["node", "app.js"]