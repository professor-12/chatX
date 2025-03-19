FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
ARG PORT
ENV NODE_ENV=production

ENV PORT=${PORT}


CMD ["npm", "run", "start"]
