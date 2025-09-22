# Use an official Node.js runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install dependencies
RUN npm install


# Generate Prisma client (optional if already in output)
# RUN npx prisma generate


COPY . .


# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
