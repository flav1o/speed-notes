FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf 

RUN npm install -g ts-node

RUN npm install 

COPY . .

RUN ts-node ./src/graphql/generate-typings.ts 

RUN npm run build
