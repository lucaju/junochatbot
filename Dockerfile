FROM node:16.3.0

WORKDIR /app

RUN npm install pm2 ts-node -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000