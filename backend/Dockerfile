# Use an official Node.js runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma client output and schema if needed
COPY prisma ./prisma
RUN npx prisma generate

# Generate Prisma client (optional if already in output)
# RUN npx prisma generate


COPY . .


# Expose the port
EXPOSE 3400

# Start the app
CMD ["node", "server.js"]
