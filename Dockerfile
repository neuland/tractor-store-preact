FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY explore/package*.json ./explore/
COPY decide/package*.json ./decide/
COPY checkout/package*.json ./checkout/
COPY integration/package*.json ./integration/

# Install all dependencies using existing script
RUN npm install && npm run install:all

# Copy source code
COPY . .

EXPOSE 3000

# Use existing prod script (builds and starts all services)
CMD ["npm", "run", "prod"]
