FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

USER node

CMD ["npm", "start"]