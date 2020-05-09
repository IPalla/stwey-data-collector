FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm i --g nodemon
# If you are building your code for production
# RUN npm ci --only=production

COPY . .
# EXPOSE 3001
CMD [ "npm", "start" ]