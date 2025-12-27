FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./

# RUN useradd app

RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb python3

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -

RUN pnpm install

COPY . .

EXPOSE 8080

ENTRYPOINT pnpm start

