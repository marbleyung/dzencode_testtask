FROM python:3.10-alpine

WORKDIR /backend

COPY . .

RUN adduser --disabled-password new-user && \
    apk add --no-cache postgresql-client build-base postgresql-dev gcc libc-dev linux-headers && \
    pip install --no-cache-dir -r reqs.txt
