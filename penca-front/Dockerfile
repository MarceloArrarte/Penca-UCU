FROM node:18.20.3

WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli@15

EXPOSE 4200

ENTRYPOINT npm start