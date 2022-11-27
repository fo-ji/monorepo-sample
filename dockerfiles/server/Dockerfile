FROM node:18.12.0-slim

WORKDIR /app/server

RUN apt-get update && \
    apt-get -y install procps

# COPY package.json yarn.lock ./

RUN yarn global add @nestjs/cli

RUN yarn install

COPY . .