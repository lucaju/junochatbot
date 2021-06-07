FROM node:16.2.0

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["pm2-runtime", "ecosystem.config.js"]

EXPOSE 3000