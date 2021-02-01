FROM node:15

# set a directory for the app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app/
RUN npm install

# copy all the files to the container
COPY . .

RUN touch /usr/src/app/server.bundle.js

RUN ["npm", "run", "build"]

# tell the port number the container should expose
EXPOSE 3000

# run the command
CMD ["npm", "run", "start"]
