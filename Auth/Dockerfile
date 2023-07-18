FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install --global nodemon
COPY . .
ENV NODE_ENV=development
EXPOSE 8081
CMD [ "npm", "start" ]
