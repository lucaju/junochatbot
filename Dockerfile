FROM node:14.16.0-alpine3.10

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000