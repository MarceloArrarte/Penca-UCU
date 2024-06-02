FROM node:22.2.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 8000

COPY . .
CMD npm run dev