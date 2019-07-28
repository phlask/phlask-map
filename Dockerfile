FROM node:carbon                                                                                                                           
  
WORKDIR /usr/src/app

COPY package*.json ./

# RUN useradd app

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT npm start

