FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl python-pip
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN pip install gunicorn

COPY . /server

WORKDIR /server

# RUN npm run build && npm run gunicorn

