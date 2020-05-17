FROM node:lts-slim                                                                                                                           
  
WORKDIR /usr/src/app

COPY package*.json ./

# RUN useradd app

RUN yarn install

COPY . .

EXPOSE 8080

ENTRYPOINT yarn start

