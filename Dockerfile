# Use Node.js LTS as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript to JavaScript
RUN npm run tsc

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
