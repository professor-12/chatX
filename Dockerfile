FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT
ENV NODE_ENV=production
ENV PORT=${PORT}

EXPOSE 1000

CMD ["npm", "run", "build:socket"]
