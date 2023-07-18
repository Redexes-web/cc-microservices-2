FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
EXPOSE 8081
CMD [ "node", "server.js" ]
