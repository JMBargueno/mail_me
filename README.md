# mail_me

## What´s mail_me?

A simple api endpoint for sending mail to a specific address.

## Development

### .env file

MAILME_PORT=""
MAILME_SMPT_HOST="smtp.domain.tld"
MAILME_SMPT_PORT="465"
MAILME_SMPT_USER="mail@domain.tld"
MAILME_SMPT_PASS=""
MAILME_SMPT_SSL=true|fase
MAILME_TO="mail@domain.tld"

## Docker

### Build

docker build -t mailme .

### Compose

```yaml
version: '3.7'
services:
  portfolio:
    image: mailme
    container_name: mailme
    environment:
      MAILME_PORT: 7093
      MAILME_SMPT_HOST: 
      MAILME_SMPT_PORT: 
      MAILME_SMPT_USER: 
      MAILME_SMPT_PASS: 
      MAILME_SMPT_SSL: 
      MAILME_TO:
      MAILME_RATE_LIMIT_REQUESTS:
      MAILME_RATE_LIMIT_MINS:
    expose:
      - 7093
    ports:
      - 7093:7093
```
