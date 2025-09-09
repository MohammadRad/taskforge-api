FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build the TypeScript source
RUN npm run build

# Expose the port
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]