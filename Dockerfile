# Specify the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project code
COPY . .

# Build the application for production
RUN npm run build

# Specify the port
EXPOSE 3030

# Run the application
CMD ["npm", "run", "start:prod"]