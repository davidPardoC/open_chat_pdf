FROM node:18.16.0
WORKDIR /server
COPY  /server/package*.json ./
RUN npm ci
COPY ./server ./
RUN npx prisma migrate dev --name init
RUN npm run build
WORKDIR /web
COPY  /web/package*.json ./
RUN npm ci
COPY ./web ./
EXPOSE 8000
WORKDIR /server
CMD [ "node", "./dist/server.js" ]