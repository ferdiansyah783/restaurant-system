FROM node:22.14.0

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["echo", "Use docker-compose to run services"]
