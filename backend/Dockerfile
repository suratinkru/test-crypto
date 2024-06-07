FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npm", "run", "start:prod"]
