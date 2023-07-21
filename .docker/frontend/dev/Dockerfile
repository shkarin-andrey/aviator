FROM node:18-buster

WORKDIR /app

RUN npm install -g npm

EXPOSE ${PORT}

USER 1000:1000

CMD npm i && npm run start
