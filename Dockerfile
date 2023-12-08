# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Angular app for production
RUN ng build --configuration=production

# Expose port 4200 for the Angular app
EXPOSE 4200

# Define the command to run the Angular app
CMD ["npm", "start"]