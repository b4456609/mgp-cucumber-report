FROM node:7.5

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3010

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Install app src
COPY src /usr/src/app/src

CMD [ "node", "./src/index.js" ]
