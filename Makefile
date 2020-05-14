SHELL = /bin/sh

SRC_BASE = ./src
ADMIN_DIR = $(SRC_BASE)/admin
FRONTEND_DIR = $(SRC_BASE)/frontend
PLUGIN_DIR = ./plugin
BUILD_REACT = npm run-script build
TEST_REACT = npm run-script test
CONTAINER_DOTFILES = ./container/dotfiles
DEV_CONTAINER_NAME = reactquiz/dev:1.0

DOTFILES = ~/.vim
DOTFILES += ~/.vimrc
DOTFILES += ~/.tmux.conf

dev:
	#rm -rf $(CONTAINER_DOTFILES)/.[a-zA-Z_-]*
	#cp -r $(DOTFILES) $(CONTAINER_DOTFILES)
	#./scripts/rmgit.sh $(CONTAINER_DOTFILES)/.vim/bundle
	docker build -t $(DEV_CONTAINER_NAME) container/
	docker run -it -v $(shell pwd):/home/me/project:delegated $(DEV_CONTAINER_NAME) fish

server:
	docker-compose up

admin:
	cd $(ADMIN_DIR) && $(BUILD_REACT)

frontend:
	cd $(FRONTEND_DIR) && $(BUILD_REACT)

plugin: admin frontend
	mkdir -p plugin
	cd $(PLUGIN_DIR) && rm -rf *
	cp -r $(ADMIN_DIR)/build/ $(PLUGIN_DIR)/admin/
	cp -r $(FRONTEND_DIR)/build/ $(PLUGIN_DIR)/frontend/
	cp   $(SRC_BASE)/*.php $(PLUGIN_DIR)

test-admin: 
	cd $(ADMIN_DIR) && $(TEST_REACT)

test-frontend: 
	cd $(FRONTEND_DIR) && $(TEST_REACT)
  
clean:
	rm -rf $(ADMIN_DIR)/build/
	rm -rf $(FRONTEND_DIR)/build/
	rm -rf $(PLUGIN_DIR)

.PHONY: container clean test-admin test-frontend frontend admin server
