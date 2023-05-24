# Open Source Chat Pdf

Powered by OpenIA and Langchain

Backend technologies:
- Node.js
- Typescript
- Langchain
- PostgreSQL
- Express

Frontend Technologies
- React.js
- Vite
- Zustand
- Axios
- ChakraUI

## Local development:

### Prerequisites:
- Docker and Docker compose installed.

1. Create a local database:
```
cd ./server
docker-compose -f docker-compose.local.yml up -d
```
2. Raise the developent server (backend):

```
cd ./server
npm i
npm run dev
```
3. Raise the developent server (frontend):
```
cd ./web
npm i
npm run develop
```
4. Start Coding !

## TODO:

- Docker Compose Automagic Setup