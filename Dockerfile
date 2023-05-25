FROM node:18.16.0
WORKDIR /usr/src/server
COPY  /server/package*.json ./
RUN npm ci
COPY ./server ./
RUN npx prisma generate
RUN npm run build
VOLUME [ "/uploads" ]
WORKDIR /usr/src/web
COPY  /web/package*.json ./
RUN npm ci
COPY ./web ./
RUN npm run build
EXPOSE 8000
WORKDIR /usr/src/server
CMD [ "npm","run","start:migrate:prod" ]