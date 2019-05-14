FROM node:8
#FROM node:carbon

# Configure directory and fine tune the permissions
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory
WORKDIR /home/node/app

# Install nodemon for hot reload
RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Run everything with less elevation
USER node

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]