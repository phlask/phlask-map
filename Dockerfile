FROM node:lts-slim                                                                                                                           

RUN apt-get update && apt-get install -y python3

WORKDIR /usr/src/app

COPY package*.json ./

# RUN useradd app

RUN yarn install

COPY . .

EXPOSE 8080

ENTRYPOINT yarn start

