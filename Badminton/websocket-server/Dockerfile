FROM 		ubuntu:14.04.3
MAINTAINER 	tpariaud@gmail.com

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get install -y build-essential libssl-dev vim g++

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 5.9.0

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
ADD package.json .
RUN npm install
WORKDIR .

EXPOSE 8085:8085
CMD npm install && npm start