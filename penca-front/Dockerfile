FROM node:22.2.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 4200

COPY . .
CMD npm start