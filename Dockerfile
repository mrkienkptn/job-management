FROM node:12.16.1-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN apk update && \
  apk upgrade && \
  apk add git

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile --silent
ADD . /app

CMD ["yarn", "start"]
