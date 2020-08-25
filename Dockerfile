ARG NODE_VERSION=12.4.0

FROM node:${NODE_VERSION}
LABEL maintainer=d.aucatoma96@gmail.com
WORKDIR /usr/src/app
COPY ./dist ./
COPY package*.json ./
COPY .env ./
RUN npm install
EXPOSE 3000/tcp

CMD ["node", "main.js"]
