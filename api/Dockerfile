FROM node:18-alpine

WORKDIR /nork

COPY ../../nork .

RUN npm install

RUN npm run build

RUN npm link

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]