# First stage
FROM node:alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm ci --only=production

COPY . /app

RUN npm run build

# Second stage
FROM node:alpine
COPY --from=build-step /app/dist/ /app/dist/
ENV MAILME_PORT=""
ENV MAILME_SMPT_HOST=""
ENV MAILME_SMPT_PORT=""
ENV MAILME_SMPT_USER=""
ENV MAILME_SMPT_PASS=""
ENV MAILME_SMPT_SSL=""
ENV MAILME_TO=""
ENV MAILME_RATE_LIMIT_MINS=""
ENV MAILME_RATE_LIMIT_REQUESTS=""
EXPOSE $MAILME_PORT

CMD ["node", "/app/dist/server.js"]
