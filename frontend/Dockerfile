# Dockerfile for frontend
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Install serve to serve the build directory
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the build directory
CMD ["serve", "-s", "build"]
