FROM node:22-alpine

WORKDIR /app

ENV EXPLORE_URL=http://localhost:3001 \
    DECIDE_URL=http://localhost:3002 \
    CHECKOUT_URL=http://localhost:3003

COPY package*.json ./
COPY explore/package*.json ./explore/
COPY decide/package*.json ./decide/
COPY checkout/package*.json ./checkout/
COPY integration/package*.json ./integration/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]
