# Use Node.js as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3001

# Start the Next.js server
CMD ["npm", "start"]