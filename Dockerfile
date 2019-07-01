### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:10-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build

RUN npm ci && mkdir /dart-app && mv ./node_modules ./dart-app

WORKDIR /dart-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder

RUN npm start
