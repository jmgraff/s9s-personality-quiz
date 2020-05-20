FROM ubuntu:19.10

# create user

# dev tools
RUN apt-get update && apt-get -y install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common \
  vim \
  tmux \
  git \
  python3.7 \
  python3-pip \
  fish \
  ncurses-term \
  iproute2

# Docker
RUN apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN	add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update
RUN apt-get -y install docker-ce-cli docker-compose

# Nodejs since apt version is really old
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update && apt-get -y install nodejs

RUN npm install npm@latest -g
RUN npm install -g react-scripts

RUN pip3 install pytest

WORKDIR /project

#copy dotfiles
COPY ./dotfiles/ /root 
