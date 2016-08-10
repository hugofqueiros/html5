FROM node
MAINTAINER hugo queiros <hugofqueiros@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm set progress=false
RUN npm install
COPY . /usr/src/app

ENV NODE_ENV production

EXPOSE 8000
CMD ["npm", "run", "bs"]
