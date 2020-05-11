FROM ubuntu:19.10

#install software
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
  python3-pip
RUN pip3 install pytest
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
RUN	add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" 
RUN apt-get update
RUN apt-get -y install docker-ce docker-ce-cli containerd.io

# create user
RUN useradd -ms /bin/bash me
USER me
WORKDIR /home/me

#copy dotfiles
COPY ./dotfiles/ .
