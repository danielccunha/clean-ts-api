FROM node:lts-alpine

WORKDIR /usr/src/app

COPY packgage.json yarn.lock ./

RUN yarn --production && yarn cache clean

COPY dist .

EXPOSE 3333

CMD [ "yarn", "start" ]
