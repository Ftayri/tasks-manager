# Stage 1: Build the Angular app
FROM node:18 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Serve the built Angular app using a lightweight HTTP server
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose a port for the frontend
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]