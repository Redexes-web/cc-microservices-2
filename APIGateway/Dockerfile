FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install --global nodemon
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
