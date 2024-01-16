# Use an official Node runtime as a parent image
FROM node:lts-alpine AS development

# Set the working directory
WORKDIR /wot-flow/frontend/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the current directory contents into the container at /app
COPY . .

# Build the Angular app
RUN npm run build

# Expose port 4200 for the Angular app
EXPOSE 4200