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
  python3-pip \
  fish \
  npm \
  ncurses-term

RUN pip3 install pytest

# create user
RUN useradd -ms /usr/bin/fish me
USER me
WORKDIR /home/me

#copy dotfiles
COPY --chown=me ./dotfiles/ .
