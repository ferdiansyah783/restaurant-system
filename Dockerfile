FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["echo", "Use docker-compose to run services"]
