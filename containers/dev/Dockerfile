FROM ubuntu:19.10

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
  iproute2 \
  unzip

# Docker
RUN apt-get -y install apt-transport-https ca-certificates gnupg-agent software-properties-common
RUN curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN apt-get update
RUN apt-get -y install docker-ce-cli docker-compose

# Chrome and webdriver
RUN curl -s -o - "https://dl.google.com/linux/linux_signing_key.pub" | apt-key add -
RUN curl -s -o /tmp/chrome.deb "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
RUN apt-get -y install /tmp/chrome.deb
RUN rm /tmp/chrome.deb
RUN curl -s -o /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/83.0.4103.14/chromedriver_linux64.zip"
RUN unzip /tmp/chromedriver.zip -d /usr/bin/
RUN rm /tmp/chromedriver.zip

# Nodejs since apt version is really old
RUN curl -sL "https://deb.nodesource.com/setup_14.x" | bash -
RUN apt-get update && apt-get -y install nodejs

RUN npm install npm@latest -g
RUN npm install -g react-scripts

# Selenium & pytest for integration testing
RUN pip3 install pytest selenium


WORKDIR /project

#copy dotfiles
COPY ./dotfiles/ /root 
