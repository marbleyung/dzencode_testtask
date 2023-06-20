FROM python:3.10-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backend

COPY . .

RUN apk add --no-cache postgresql-client build-base postgresql-dev gcc libc-dev linux-headers
RUN pip install --no-cache-dir -r reqs.txt


RUN sed -i 's/\r$//g' /backend/entrypoint.sh && chmod +x /backend/entrypoint.sh


ENTRYPOINT ["/backend/entrypoint.sh"]

