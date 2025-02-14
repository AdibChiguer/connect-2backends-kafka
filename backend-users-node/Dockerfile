# Use official Node.js 18 image as the base
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the correct port (match your Node.js app)
EXPOSE 3000

# Start the application (change based on your script in package.json)
CMD ["npm", "start"]