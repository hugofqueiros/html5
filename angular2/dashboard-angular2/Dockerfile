## work in progress still (just skeleton)

FROM    ubuntu:ubuntu

# Install Node.js and npm
RUN     yum install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

EXPOSE  8080

CMD ["node", "/src/index.js"]

### to run
### docker build -t <your username>/centos-node-hello .
### test app
### $ docker ps
