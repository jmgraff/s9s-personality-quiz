FROM ubuntu:latest

# misc
RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    fish \
    git \
    gnupg-agent \
    iproute2 \
    ncurses-term \
    python3-pip \
    python3.7 \
    software-properties-common \
    subversion \
    tmux \
    unzip \
    vim \
    zip

# Python packages
RUN pip3 install python-slugify

# Docker
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install apt-transport-https ca-certificates gnupg-agent software-properties-common
RUN curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" | apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
RUN DEBIAN_FRONTEND=noninteractive apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install docker-ce-cli docker-compose

# Node.js / NPM
RUN curl -sL "https://deb.nodesource.com/setup_14.x" | bash -
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get -y install nodejs
RUN npm install npm@latest -g
RUN npm install -g react-scripts

# Cypress
RUN DEBIAN_FRONTEND=noninteractive TZ="America/New_York" apt-get -y install libgtk2.0-0 libgtk-3-0 \
	libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN npm install -g cypress --unsafe-perm --silent


# home
WORKDIR /project
RUN git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
COPY ./dotfiles/ /root
