FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 8080

CMD ["npm", "run", "app"]